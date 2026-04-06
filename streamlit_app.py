import streamlit as st

# ─── Species data ────────────────────────────────────────────────────────
SPECIES_DATA = {
    'Iris Setosa': {
        'emoji': '🌿',
        'description': 'A compact, hardy species with notably short petals. Native to the Arctic and alpine regions, Setosa is easily distinguished by its small, rounded petals and is the most divergent of the three species.'
    },
    'Iris Versicolor': {
        'emoji': '🪻',
        'description': 'The Blue Flag Iris, common across North America. Versicolor displays elegant violet-blue petals with intricate veining and thrives in wetland environments. Its measurements fall neatly between Setosa and Virginica.'
    },
    'Iris Virginica': {
        'emoji': '🌸',
        'description': 'The Southern Blue Flag, the largest of the three species. Virginica bears wide, sweeping petals in deep violet hues, found along the marshy shores of the eastern United States.'
    }
}

# ─── Prediction model ────────────────────────────────────────────────────
def classify_iris(petal_length, petal_width):
    if petal_length <= 2.45:
        return 'Iris Setosa'
    if petal_width <= 1.75 and petal_length <= 4.95:
        return 'Iris Versicolor'
    return 'Iris Virginica'

# ─── Streamlit UI ────────────────────────────────────────────────────────
st.set_page_config(page_title="Iris Species Predictor", page_icon="🌸")

st.title("🌸 Iris Species Predictor")
st.write("Enter your measurements below to identify the iris species.")

col1, col2 = st.columns(2)

with col1:
    sepal_length = st.number_input("Sepal Length (cm)", min_value=0.0, value=5.1, step=0.1)
    petal_length = st.number_input("Petal Length (cm)", min_value=0.0, value=1.4, step=0.1)

with col2:
    sepal_width = st.number_input("Sepal Width (cm)", min_value=0.0, value=3.5, step=0.1)
    petal_width = st.number_input("Petal Width (cm)", min_value=0.0, value=0.2, step=0.1)

if st.button("Identify Species ➔", type="primary"):
    species_name = classify_iris(petal_length, petal_width)
    data = SPECIES_DATA[species_name]
    
    st.success(f"### {data['emoji']} {species_name}")
    st.write(data['description'])
