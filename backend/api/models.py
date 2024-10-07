# myapp/models.py
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.db import models

class User(AbstractUser):
    name=models.CharField(_("Name of User"), blank=True, max_length=255)
    income=models.IntegerField(default=0,null=False,blank=False)
    pass

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Establishes the relationship between User and Transaction
    Reason = models.CharField(max_length=255)  # Reason for the transaction
    Amount_Spent = models.DecimalField(max_digits=10, decimal_places=2)  # Amount spent in the transaction
    Date = models.DateTimeField()  # Date of the transaction
    Category = models.CharField(max_length=100)  # Category of the transaction
    Available_Amount = models.DecimalField(max_digits=10, decimal_places=2)  # Available amount after transaction

    def __str__(self):
        return f"Transaction {self.id} by {self.user.email}"
    
class AdvisorReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Reason = models.CharField(max_length=255)
    Category = models.CharField(max_length=100)
    Date = models.DateTimeField()
    amount=models.DecimalField(max_digits=10, decimal_places=2) 

    def __str__(self):
        return f"{self.user.email}"
    
class Evaluator(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE,null=True)
    can_spent=models.DecimalField(max_digits=10, decimal_places=2) 
    savings=models.DecimalField(max_digits=10, decimal_places=2) 
    def __str__(self):
        return f"{self.transaction.user.email}"
    
