/**
 * Iris Species Predictor
 * Decision-tree model derived from Fisher's Iris Dataset (1936)
 */

// ─── Species data ──────────────────────────────────────────────────────────
const SPECIES_DATA = {
  'Iris Setosa': {
    key: 'setosa',
    emoji: '🌿',
    description:
      'A compact, hardy species with notably short petals. Native to the Arctic and alpine regions, Setosa is easily distinguished by its small, rounded petals and is the most divergent of the three species.',
  },
  'Iris Versicolor': {
    key: 'versicolor',
    emoji: '🪻',
    description:
      'The Blue Flag Iris, common across North America. Versicolor displays elegant violet-blue petals with intricate veining and thrives in wetland environments. Its measurements fall neatly between Setosa and Virginica.',
  },
  'Iris Virginica': {
    key: 'virginica',
    emoji: '🌸',
    description:
      'The Southern Blue Flag, the largest of the three species. Virginica bears wide, sweeping petals in deep violet hues, found along the marshy shores of the eastern United States.',
  },
};

// ─── Prediction model ──────────────────────────────────────────────────────
/**
 * Classifies an iris flower based on petal measurements.
 * Rule-based decision tree derived from CART on Fisher's dataset.
 *
 * @param {number} petalLength - Petal length in cm
 * @param {number} petalWidth  - Petal width in cm
 * @returns {string} Predicted species name
 */
function classifyIris(petalLength, petalWidth) {
  if (petalLength <= 2.45) {
    return 'Iris Setosa';
  }
  if (petalWidth <= 1.75 && petalLength <= 4.95) {
    return 'Iris Versicolor';
  }
  return 'Iris Virginica';
}

// ─── DOM helpers ───────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

function getInputs() {
  return {
    sepalLength: parseFloat($('sepal-length').value),
    sepalWidth:  parseFloat($('sepal-width').value),
    petalLength: parseFloat($('petal-length').value),
    petalWidth:  parseFloat($('petal-width').value),
  };
}

function clearErrors() {
  ['sepal-length', 'sepal-width', 'petal-length', 'petal-width'].forEach((id) => {
    $(id).classList.remove('error');
  });
}

function markError(id) {
  $(id).classList.add('error');
  // Remove after animation so it can be re-triggered
  $(id).addEventListener('animationend', () => $(id).classList.remove('error'), { once: true });
}

function setResult(html) {
  const section = $('result-inner');
  // Fade out then swap content
  section.style.opacity = '0';
  section.style.transform = 'translateY(8px)';
  setTimeout(() => {
    section.innerHTML = html;
    section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  }, 180);
}

// ─── Validation ────────────────────────────────────────────────────────────
function validate(inputs) {
  const fields = [
    { id: 'sepal-length', value: inputs.sepalLength, label: 'Sepal Length' },
    { id: 'sepal-width',  value: inputs.sepalWidth,  label: 'Sepal Width'  },
    { id: 'petal-length', value: inputs.petalLength, label: 'Petal Length' },
    { id: 'petal-width',  value: inputs.petalWidth,  label: 'Petal Width'  },
  ];

  const missing = fields.filter((f) => isNaN(f.value) || $( f.id).value.trim() === '');

  if (missing.length === 0) return true;

  missing.forEach((f) => markError(f.id));

  const missingNames = missing.map((f) => f.label).join(', ');
  setResult(`
    <div class="result-error">
      <span class="err-icon">⚠️</span>
      <div class="err-text">
        <strong>Missing measurements</strong>
        Please fill in: ${missingNames}.
      </div>
    </div>
  `);

  return false;
}

// ─── Main predict function ─────────────────────────────────────────────────
function predict() {
  clearErrors();

  const inputs = getInputs();
  if (!validate(inputs)) return;

  const speciesName = classifyIris(inputs.petalLength, inputs.petalWidth);
  const data        = SPECIES_DATA[speciesName];

  setResult(`
    <div class="result-card species--${data.key}">
      <div class="result-card-banner">
        <div class="result-tag">Identified Species</div>
        <div class="result-species">
          <em>${speciesName.split(' ')[0]}</em> ${speciesName.split(' ')[1]}
        </div>
      </div>
      <div class="result-card-body">
        <p class="result-desc">${data.description}</p>
        <div class="species-badge" aria-hidden="true">${data.emoji}</div>
      </div>
    </div>
  `);
}

// ─── Allow Enter key to trigger prediction ─────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') predict();
});

// ─── Live error clearing on input ──────────────────────────────────────────
['sepal-length', 'sepal-width', 'petal-length', 'petal-width'].forEach((id) => {
  $(id).addEventListener('input', () => $(id).classList.remove('error'));
});
