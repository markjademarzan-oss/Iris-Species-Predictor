import pandas as pd
from sklearn import datasets
from sklearn.tree import DecisionTreeClassifier
import joblib

# 1. Load the dataset (This acts as your .csv file)
print("Loading the Fisher's Iris Dataset...") 
iris = datasets.load_iris()
X = iris.data
y = iris.target

# 2. Train the machine learning model
print("Training the Decision Tree model...")
model = DecisionTreeClassifier()
model.fit(X, y)

# 3. Save the trained "brain" to a separate file
joblib.dump(model, 'iris_model.pkl')
print("✅ Success! Model saved as 'iris_model.pkl'")
