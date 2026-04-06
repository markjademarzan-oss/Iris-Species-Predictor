import streamlit as st
import joblib
import numpy as np

# ─── Load the Separated Model ────────────────────────────────────────────
# This loads the trained brain you created in Colab!
model = joblib.load('iris_model.pkl')

# ─── Species Data ────────────────────────────────────────────────────────
# The model outputs numbers (0, 1, 2), so we map them back to names
SPECIES_MAP = {
    0: {'name': 'Iris Setosa', 'emoji': '🌿', 'desc': 'A compact, hardy species with notably short petals.'},
    1: {'name': 'Iris Versicolor', 'emoji': '🪻', 'desc': 'The Blue Flag Iris, common across North America. Measurements fall neatly between Setosa and Virginica.'},
    2: {'name': 'Iris Virginica', 'emoji': '🌸', 'desc': 'The Southern Blue Flag, the largest of the three species. Bears wide, sweeping petals.'}
}

# ─── Streamlit UI ────────────────────────────────────────────────────────
st.set_page_config(page_title="Iris Species Predictor", page_icon="🌸")

st.title("🌸 Iris Species Predictor")
st.write("Enter your measurements below to identify the iris species using a trained Machine Learning model.")

col1, col2 = st.columns(2)

with col1:
    sepal_length = st.number_input("Sepal Length (cm)", min_value=0.0, value=5.1, step=0.1)
    petal_length = st.number_input("Petal Length (cm)", min_value=0.0, value=1.4, step=0.1)

with col2:
    sepal_width = st.number_input("Sepal Width (cm)", min_value=0.0, value=3.5, step=0.1)
    petal_width = st.number_input("Petal Width (cm)", min_value=0.0, value=0.2, step=0.1)

if st.button("Identify Species ➔", type="primary"):
    # Group the user's inputs into the exact format the model expects
    input_data = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
    
    # Use the loaded model to calculate the prediction
    prediction_num = model.predict(input_data)[0]
    
    # Get the details for the predicted species
    result = SPECIES_MAP[prediction_num]
    
    st.success(f"### {result['emoji']} {result['name']}")
    st.write(result['desc'])
