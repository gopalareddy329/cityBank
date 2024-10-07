# myapp/views.py
import csv
from datetime import datetime
from django.http import JsonResponse
from django.utils import timezone
from django.db.models import Sum
from datetime import timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .models import User,Transaction,AdvisorReport,Evaluator
from django.db.models.functions import TruncMonth
from django.views.decorators.csrf import csrf_exempt
from .serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .token import MyTokenObtainPairSerializer
import joblib
from django.db.models import Q
import pandas as pd


class_label_encoder_reason = joblib.load('api/mlmodel/label_encoder_reason_class.pkl')
class_category_encoder = joblib.load('api/mlmodel/label_encoder_category_class.pkl')
class_scaler = joblib.load('api/mlmodel/scaler.pkl')
class_clf = joblib.load('api/mlmodel/random_forest_model.pkl')
reg_label_encoder_reason = joblib.load('api/mlmodel/label_encoder_reason_reg.pkl') 
reg_label_encoder_category = joblib.load('api/mlmodel/label_encoder_category_reg.pkl')
reg_model = joblib.load('api/mlmodel/random_forest_regressor_model.pkl') 




def classification(request,amount_spent,available,reason):
        sample_data = pd.DataFrame({
                'Income': [request.user.income],  
                'Amount_Spent': [amount_spent],
                'Available_Amount': [available],  
                'Reason': [reason] 
            })

        sample_data['Reason'] = class_label_encoder_reason.transform(sample_data['Reason'])
        model_feature_names = class_clf.feature_names_in_
        sample_data = sample_data[model_feature_names]
        numerical_columns = ['Income', 'Amount_Spent', 'Available_Amount']
        sample_data[numerical_columns] = class_scaler.transform(sample_data[numerical_columns])
        predicted_category = class_clf.predict(sample_data)
        decoded_category = class_category_encoder.inverse_transform(predicted_category)
        print("Predicted Category:", decoded_category[0]) 
        output= decoded_category[0]
        
        return output

def regression(request,available,reason,category):
    new_data = pd.DataFrame({
    'Income': [request.user.income],  # Replace with appropriate values
    'Available_Amount': [available],  # Replace with appropriate values
    'Reason': [reason],  # Replace with appropriate values
    'Category': [category]  # Ensure 'Category' is also included
    })
    new_data['Reason'] = reg_label_encoder_reason.transform(new_data['Reason'])
    new_data['Category'] = reg_label_encoder_category.transform(new_data['Category'])
    model_feature_names = reg_model.feature_names_in_

    try:
        new_data = new_data[model_feature_names]
    except KeyError as e:
        print(f"KeyError: {e}. Please check the columns of new_data and model_feature_names.")
    
    predicted_can_spent = reg_model.predict(new_data)
    
    return predicted_can_spent[0]


def advisor_report(request):
    last_20_reports = AdvisorReport.objects.filter(user=request.user).exclude(Category="Good").order_by('-Date')[:20]
    report_data = []
    for report in last_20_reports:
        report_data.append({
            'date': report.Date,
            'amount': report.amount
        })

    return {'reports': report_data}

def TreeMap(request):
    now = timezone.now()

    thirty_days_ago = now - timedelta(days=30)
    last_30_days_transactions = (
    Transaction.objects.filter(user=request.user, Date__gte=thirty_days_ago)
    .values('Reason')
    .annotate(total_spent=Sum('Amount_Spent'))
    )

    response_data = list(last_30_days_transactions)
   
    return {'reports': response_data}

def PieChart(request):

    six_months_ago = timezone.now() - timedelta(days=180)
    monthly_transactions = (
    Transaction.objects
    .filter(user=request.user, Date__gte=six_months_ago) 
    .values('Reason')  
    .annotate(total_amount_spent=Sum('Amount_Spent')) 
    .order_by('Reason')  
    )


    response_data = list(monthly_transactions)
   
    return {'reports': response_data}

def RadarChart(request):

    months_ago = timezone.now() - timedelta(days=30)
    monthly_transactions = (
    Transaction.objects
    .filter(user=request.user, Date__gte=months_ago) 
    .values('Reason') 
    .annotate(total_amount_spent=Sum('Amount_Spent'))  
    .annotate(total_can_spent=Sum('evaluator__can_spent')) 
    .order_by('Reason')  
    )


    response_data = list(monthly_transactions)
   
    return {'reports': response_data}

def monthly_transaction_summary(request):
    six_months_ago = timezone.now() - timedelta(days=180)

    monthly_transactions = (
        Transaction.objects
        .filter(user=request.user,Date__gte=six_months_ago)
        .annotate(month=TruncMonth('Date'))  
        .values('month') 
        .annotate(total_amount_spent=Sum('Amount_Spent'))  
        .annotate(total_can_spent=Sum('evaluator__can_spent')) 
        .order_by('month')  
    )

   
    context = {
        'monthly_summary': monthly_transactions,
    }

    return context

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    username = request.data.get('username_or_email')
    password = request.data.get('password')
    income = request.data.get('income')
    if not username or not password or not income:
        return Response({'error': 'Username and password and income are required'}, status=status.HTTP_400_BAD_REQUEST)
    name=request.data.get("name") if request.data.get("name") !=None else  username.split("@")[0] if '@' in username else username
    email=request.data.get("email") if request.data.get("email") !=None else  username if '@' in username else '' 
    

    user, created = User.objects.get_or_create(username=username,email=email,name=name,income=income)
    if created:
        user.set_password(password)
        user.save()
        serializer=MyTokenObtainPairSerializer(data={"username":username,"email":email,"name":name,"password":password})
        serializer.is_valid(raise_exception=True)
        

        return Response({'refresh': str(serializer.validated_data["refresh"]),'access':serializer.validated_data['access']}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_details(request):
    print(request.headers)
    print(request.auth)
    user = request.user
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def advisor(request):
    amount_spent = request.data.get("amount")
    reason = request.data.get("reason")
    
    if amount_spent and reason:
        now = timezone.now()
        start_of_month = now.replace(day=1)
        end_of_month = (start_of_month + timezone.timedelta(days=32)).replace(day=1) - timezone.timedelta(days=1)

        # Get the user
        user = request.user

        last_transaction = Transaction.objects.filter(
        user=user,
        Date__gte=start_of_month,  # Transactions from the start of the month
        Date__lte=end_of_month      # Transactions up until the end of the month
        ).order_by('-Date').first()

        available=0

        if last_transaction:
            available=last_transaction.Available_Amount
        else:
            available=request.user.income
        output=classification(request,amount_spent,available,reason)

        AdvisorReport.objects.create(
            user=user,
            Date=timezone.now(),
            Reason=reason,
            Category=output,
            amount=amount_spent
            )
        return Response({
            'spent':True if output=="Good" else False
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Provide both amount spent and reason'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def evalutor(request):
    amount_spent = int(request.data.get("amount"))
    reason = request.data.get("reason")
    
    if amount_spent and reason:
        now = timezone.now()
        start_of_month = now.replace(day=1)
        end_of_month = (start_of_month + timezone.timedelta(days=32)).replace(day=1) - timezone.timedelta(days=1)
        user = request.user

        last_transaction = Transaction.objects.filter(
        user=user,
        Date__gte=start_of_month,  
        Date__lte=end_of_month  
        ).order_by('-Date').first()

        available=0

        if last_transaction:
            available=last_transaction.Available_Amount
        else:
            available=request.user.income
        output=classification(request,amount_spent,available,reason)
        can_spent=int(regression(request,available,reason,output))
        print(can_spent)
        transaction=Transaction.objects.create(
            user=user,
            Reason=reason,
            Amount_Spent=amount_spent,
            Date=timezone.now(),
            Category=output,
            Available_Amount=available-amount_spent
        )
        Evaluator.objects.create(
            transaction=transaction,
            can_spent=can_spent,
            savings=int(can_spent)-int(amount_spent),
        )

        
        return Response({
            'spent':amount_spent,
            'can_spent':can_spent,
            'savings':int(can_spent)-int(amount_spent)
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Provide both amount spent and reason'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def graphs(request):
    advisor_report_data = advisor_report(request)  
    tree_map=TreeMap(request)
    monthly_transaction=monthly_transaction_summary(request)
    radar=RadarChart(request)
    pie=PieChart(request)
    return Response({
        "advisor_report": advisor_report_data ,
        "tree_map":tree_map,
        "monthly_transaction_summary":monthly_transaction,
        "pie":pie,
        "radar":radar
    }, status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([AllowAny])
def test(request):
    Transaction.objects.all().delete()
    AdvisorReport.objects.all().delete()
    file_path = "/Users/gopalareddy/Desktop/repo/city/cityBank/backend/api/mlmodel/Evaluator.csv"
    
    try:
        with open(file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            
            for row in reader:
                try:
                    user = User.objects.get(id=row['User_ID'])
                    
                    date_str = row['Date']
                    try:
                        # Attempt to parse as a full datetime with time
                        date = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S.%f')
                    except ValueError:
                        # If only a date is present, parse it without time
                        date = datetime.strptime(date_str, '%Y-%m-%d').date()
                    
                    # Create the Transaction object and populate it with the CSV data
                    transaction = Transaction(
                        user=user,
                        Reason=row['Reason'],
                        Amount_Spent=row['Amount_Spent'],
                        Date=date,  # Save the parsed date (either full datetime or just date)
                        Category=row['Category_Predicted'],
                        Available_Amount=row['Available_Amount']
                    )

                    transaction.save()  # Save the transaction to the database
                    Evaluator.objects.create(
                        transaction=transaction,
                        can_spent=row['can_spent_predicted'],
                        savings=row['savings'],
                    )
                    AdvisorReport.objects.create(
                        user=user,
                        Date=date,
                        Reason=row['Reason'],
                        Category=row['Category_Predicted'],
                        amount=row['Amount_Spent']
                        )
                except User.DoesNotExist:
                    return Response({"error": f"User with ID {row['User_ID']} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "CSV data has been successfully imported."}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

