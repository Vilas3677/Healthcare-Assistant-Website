// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AI Symptoms Checker
function checkSymptoms() {
    const symptomsInput = document.getElementById('symptoms-input').value;
    const resultBox = document.getElementById('symptoms-result');
    
    if (!symptomsInput.trim()) {
        alert('Please describe your symptoms');
        return;
    }

    // Show loading state
    resultBox.style.display = 'block';
    resultBox.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Analyzing symptoms...</div>';

    // Simulate AI analysis (In a real application, this would make an API call to a backend service)
    setTimeout(() => {
        const mockAnalysis = analyzeSymptoms(symptomsInput);
        resultBox.innerHTML = `
            <h3><i class="fas fa-clipboard-check"></i> Analysis Results:</h3>
            <p><strong><i class="fas fa-exclamation-circle"></i> Possible Conditions:</strong></p>
            <ul>
                ${mockAnalysis.conditions.map(condition => `<li>${condition}</li>`).join('')}
            </ul>
            <p><strong><i class="fas fa-list-check"></i> Recommended Actions:</strong></p>
            <ul>
                ${mockAnalysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
            ${mockAnalysis.urgency ? `<p class="urgency ${mockAnalysis.urgency.level}"><i class="fas fa-exclamation-triangle"></i> ${mockAnalysis.urgency.message}</p>` : ''}
            <p class="disclaimer"><i class="fas fa-info-circle"></i> Note: This is an AI-powered preliminary analysis. Please consult with a healthcare professional for accurate diagnosis.</p>
        `;
    }, 1500);
}

// Mock symptom analysis function
function analyzeSymptoms(symptoms) {
    const symptomsLower = symptoms.toLowerCase();
    let conditions = [];
    let recommendations = [];
    let urgency = null;

    // Common symptoms patterns
    if (symptomsLower.includes('headache')) {
        conditions.push('Tension Headache', 'Migraine');
        recommendations.push(
            'Rest in a quiet, dark room',
            'Stay hydrated',
            'Consider over-the-counter pain relievers like acetaminophen or ibuprofen'
        );
    }
    if (symptomsLower.includes('fever')) {
        conditions.push('Common Cold', 'Flu');
        recommendations.push(
            'Get plenty of rest',
            'Stay hydrated',
            'Take acetaminophen to reduce fever',
            'Monitor temperature regularly'
        );
        if (symptomsLower.includes('high') || symptomsLower.includes('severe')) {
            urgency = {
                level: 'high',
                message: 'High fever detected. If temperature exceeds 103°F (39.4°C), seek immediate medical attention.'
            };
        }
    }
    if (symptomsLower.includes('cough')) {
        conditions.push('Common Cold', 'Bronchitis');
        recommendations.push(
            'Stay hydrated',
            'Use honey for soothing throat',
            'Consider over-the-counter cough suppressants',
            'Use a humidifier while sleeping'
        );
    }
    if (symptomsLower.includes('chest pain')) {
        conditions.push('Various possible conditions');
        recommendations.push('Seek immediate medical attention');
        urgency = {
            level: 'emergency',
            message: 'Chest pain can be serious. Please seek emergency medical care immediately.'
        };
    }

    // Default response if no specific symptoms are matched
    if (conditions.length === 0) {
        conditions.push('Multiple possibilities');
        recommendations.push(
            'Consult with a healthcare provider for accurate diagnosis',
            'Monitor your symptoms',
            'Keep track of when symptoms started and any changes'
        );
    }

    return {
        conditions: [...new Set(conditions)], // Remove duplicates
        recommendations: recommendations,
        urgency: urgency
    };
}

// Medicine Search Function
function searchMedicine() {
    const medicineInput = document.getElementById('medicine-input').value;
    const resultBox = document.getElementById('medicine-result');

    if (!medicineInput.trim()) {
        alert('Please enter a medicine name');
        return;
    }

    // Show loading state
    resultBox.style.display = 'block';
    resultBox.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';

    // Simulate medicine search
    setTimeout(() => {
        const mockMedicineInfo = getMedicineInfo(medicineInput);
        resultBox.innerHTML = `
            <h3><i class="fas fa-pills"></i> Medicine Information:</h3>
            <p><strong>Name:</strong> ${mockMedicineInfo.name}</p>
            <p><strong>Category:</strong> ${mockMedicineInfo.category}</p>
            <p><strong>Common Uses:</strong></p>
            <ul>
                ${mockMedicineInfo.uses.map(use => `<li>${use}</li>`).join('')}
            </ul>
            <p><strong>Dosage:</strong></p>
            <ul>
                ${mockMedicineInfo.dosage.map(dose => `<li>${dose}</li>`).join('')}
            </ul>
            <p><strong>Precautions:</strong></p>
            <ul>
                ${mockMedicineInfo.precautions.map(precaution => `<li>${precaution}</li>`).join('')}
            </ul>
            <p class="disclaimer"><i class="fas fa-info-circle"></i> Note: Always consult with a healthcare professional before taking any medication.</p>
        `;
    }, 1000);
}

// Medicine Suggestion Function
function suggestMedicine() {
    const condition = document.getElementById('condition-select').value;
    const severity = document.getElementById('severity-select').value;
    const resultBox = document.getElementById('suggestion-result');

    if (!condition || !severity) {
        alert('Please select both condition and severity');
        return;
    }

    // Show loading state
    resultBox.style.display = 'block';
    resultBox.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Generating suggestions...</div>';

    // Simulate suggestion generation
    setTimeout(() => {
        const suggestions = getMedicineSuggestions(condition, severity);
        resultBox.innerHTML = `
            <h3><i class="fas fa-lightbulb"></i> Suggested Medications:</h3>
            <div class="suggestions-grid">
                ${suggestions.map(med => `
                    <div class="medicine-card">
                        <h4><i class="fas fa-pills"></i> ${med.name}</h4>
                        <p class="medicine-type">${med.type}</p>
                        <p class="medicine-dosage"><i class="fas fa-clock"></i> ${med.dosage}</p>
                        <p class="medicine-price"><i class="fas fa-tag"></i> Approx. ${med.price}</p>
                        ${med.warning ? `<p class="medicine-warning"><i class="fas fa-exclamation-triangle"></i> ${med.warning}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            <p class="disclaimer"><i class="fas fa-info-circle"></i> Note: These are general suggestions. Please consult a healthcare professional for personalized advice.</p>
        `;
    }, 1000);
}

// Mock medicine information function
function getMedicineInfo(medicine) {
    return {
        name: medicine,
        category: 'Over-the-counter medication',
        uses: [
            'Relief of mild to moderate pain',
            'Reduction of fever',
            'Treatment of common cold symptoms',
            'Anti-inflammatory properties'
        ],
        dosage: [
            'Adults: 1-2 tablets every 4-6 hours',
            'Children (12+ years): 1 tablet every 4-6 hours',
            'Maximum 6 tablets in 24 hours'
        ],
        precautions: [
            'Consult doctor before use if you have any existing medical conditions',
            'Do not exceed recommended dosage',
            'Keep out of reach of children',
            'Store in a cool, dry place',
            'Stop use and consult doctor if symptoms persist'
        ]
    };
}

// Mock medicine suggestions function
function getMedicineSuggestions(condition, severity) {
    const suggestions = {
        headache: {
            mild: [
                {
                    name: 'Acetaminophen 500mg',
                    type: 'Pain Reliever',
                    dosage: '1 tablet every 4-6 hours',
                    price: '$5-10',
                },
                {
                    name: 'Ibuprofen 200mg',
                    type: 'NSAID Pain Reliever',
                    dosage: '1-2 tablets every 6 hours',
                    price: '$6-12',
                }
            ],
            moderate: [
                {
                    name: 'Excedrin Extra Strength',
                    type: 'Combined Pain Reliever',
                    dosage: '2 tablets every 6 hours',
                    price: '$8-15',
                    warning: 'Contains caffeine'
                }
            ],
            severe: [
                {
                    name: 'Consult Doctor',
                    type: 'Professional Medical Advice Required',
                    dosage: 'As prescribed',
                    price: 'Varies',
                    warning: 'Severe headaches require medical evaluation'
                }
            ]
        },
        fever: {
            mild: [
                {
                    name: 'Acetaminophen 500mg',
                    type: 'Fever Reducer',
                    dosage: '1 tablet every 4-6 hours',
                    price: '$5-10'
                }
            ],
            moderate: [
                {
                    name: 'Ibuprofen 400mg',
                    type: 'NSAID Fever Reducer',
                    dosage: '1 tablet every 6 hours',
                    price: '$7-12'
                }
            ],
            severe: [
                {
                    name: 'Seek Medical Care',
                    type: 'Emergency Care Required',
                    dosage: 'N/A',
                    price: 'N/A',
                    warning: 'High fever requires immediate medical attention'
                }
            ]
        }
    };

    return suggestions[condition]?.[severity] || [
        {
            name: 'Consult Healthcare Provider',
            type: 'Professional Consultation Required',
            dosage: 'As prescribed',
            price: 'Varies',
            warning: 'This condition requires professional medical evaluation'
        }
    ];
}

// Tab switching functionality
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`button[onclick="switchTab('${tabName}')"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Handle doctor consultation booking
document.querySelectorAll('.consult-button').forEach(button => {
    button.addEventListener('click', function() {
        const doctorCard = this.closest('.doctor-card');
        const doctorName = doctorCard.querySelector('h3').textContent;
        const specialty = doctorCard.querySelector('p:nth-child(4)').textContent;
        
        alert(`Booking video consultation with ${doctorName} (${specialty}). In a real application, this would open a booking form.`);
    });
});
