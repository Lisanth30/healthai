// Typing Animation for Welcome Page
if (document.getElementById('typingText')) {
    const text = 'Analyze your symptoms instantly...';
    let index = 0;
    const typingElement = document.getElementById('typingText');

    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 80);
        } else {
            setTimeout(() => {
                typingElement.textContent = '';
                index = 0;
                typeText();
            }, 2000);
        }
    }

    setTimeout(typeText, 500);
}

// Navigate to Language Selection
function navigateToLanguage() {
    window.location.href = 'language.html';
}

// Select Language and Navigate to Chat
function selectLanguage(language) {
    localStorage.setItem('selectedLanguage', language);
    window.location.href = 'chat.html';
}

// Mock Disease Database
const diseaseDatabase = [
    {
        symptoms: ['fever', 'cough', 'fatigue', 'body ache'],
        disease: 'Influenza (Flu)',
        confidence: 87,
        risk: 'moderate',
        description: 'Common viral infection affecting the respiratory system'
    },
    {
        symptoms: ['headache', 'fever', 'stiff neck', 'nausea'],
        disease: 'Meningitis',
        confidence: 92,
        risk: 'high',
        description: 'Inflammation of membranes surrounding brain and spinal cord'
    },
    {
        symptoms: ['chest pain', 'shortness of breath', 'arm pain', 'sweating'],
        disease: 'Cardiac Event',
        confidence: 95,
        risk: 'high',
        description: 'Potential heart-related medical emergency'
    },
    {
        symptoms: ['runny nose', 'sneezing', 'sore throat', 'mild fever'],
        disease: 'Common Cold',
        confidence: 78,
        risk: 'low',
        description: 'Mild viral infection of the upper respiratory tract'
    },
    {
        symptoms: ['abdominal pain', 'nausea', 'vomiting', 'diarrhea'],
        disease: 'Gastroenteritis',
        confidence: 85,
        risk: 'moderate',
        description: 'Inflammation of the digestive tract'
    },
    {
        symptoms: ['persistent cough', 'wheezing', 'shortness of breath'],
        disease: 'Asthma',
        confidence: 81,
        risk: 'moderate',
        description: 'Chronic respiratory condition causing airway inflammation'
    },
    {
        symptoms: ['rash', 'itching', 'red skin', 'swelling'],
        disease: 'Allergic Reaction',
        confidence: 76,
        risk: 'low',
        description: 'Immune system response to allergens'
    },
    {
        symptoms: ['joint pain', 'swelling', 'stiffness', 'reduced mobility'],
        disease: 'Arthritis',
        confidence: 79,
        risk: 'moderate',
        description: 'Joint inflammation causing pain and stiffness'
    },
    {
        symptoms: ['fatigue', 'weight loss', 'excessive thirst', 'frequent urination'],
        disease: 'Diabetes',
        confidence: 88,
        risk: 'moderate',
        description: 'Metabolic disorder affecting blood sugar regulation'
    },
    {
        symptoms: ['severe headache', 'vision problems', 'sensitivity to light'],
        disease: 'Migraine',
        confidence: 83,
        risk: 'moderate',
        description: 'Neurological condition causing severe headaches'
    }
];

// Analyze Symptoms and Find Match
function analyzeSymptoms(userSymptoms) {
    const inputSymptoms = userSymptoms.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2);

    let bestMatch = null;
    let highestScore = 0;

    diseaseDatabase.forEach(disease => {
        let matchCount = 0;
        disease.symptoms.forEach(symptom => {
            if (inputSymptoms.some(input => symptom.includes(input) || input.includes(symptom))) {
                matchCount++;
            }
        });

        const score = matchCount / disease.symptoms.length;
        if (score > highestScore) {
            highestScore = score;
            bestMatch = disease;
        }
    });

    // If no good match, return a generic result
    if (!bestMatch || highestScore < 0.3) {
        return {
            disease: 'General Symptoms',
            confidence: 65,
            risk: 'low',
            description: 'Please provide more specific symptoms for accurate analysis'
        };
    }

    return bestMatch;
}

// Chat Functionality
if (document.getElementById('chatContainer')) {
    const chatContainer = document.getElementById('chatContainer');
    const chatForm = document.getElementById('chatForm');
    const symptomInput = document.getElementById('symptomInput');

    // Send Message
    window.sendMessage = function (event) {
        event.preventDefault();

        const userMessage = symptomInput.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        addUserMessage(userMessage);

        // Clear input
        symptomInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI processing delay
        setTimeout(() => {
            removeTypingIndicator();
            const analysis = analyzeSymptoms(userMessage);
            addAIResponse(analysis);
        }, 2000);
    };

    // Add User Message
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end';
        messageDiv.innerHTML = `
            <div class="user-bubble" data-testid="user-message">
                <p class="text-base leading-relaxed">${escapeHtml(message)}</p>
            </div>
        `;
        chatContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'flex justify-start';
        typingDiv.innerHTML = `
            <div class="ai-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatContainer.appendChild(typingDiv);
        scrollToBottom();
    }

    // Remove Typing Indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Add AI Response with Prediction Card
    function addAIResponse(analysis) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'flex justify-start';

        const riskClass = `risk-${analysis.risk}`;
        const riskLabel = analysis.risk.charAt(0).toUpperCase() + analysis.risk.slice(1);

        responseDiv.innerHTML = `
            <div class="ai-bubble" data-testid="ai-message">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7B2CBF] flex items-center justify-center flex-shrink-0">
                        <i data-lucide="bot" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-base leading-relaxed mb-2">
                            Based on your symptoms, here's my analysis:
                        </p>
                        
                        <!-- Prediction Card -->
                        <div class="prediction-card" data-testid="prediction-card">
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h4 class="text-xl font-semibold font-heading text-white mb-1" data-testid="disease-name">
                                        ${escapeHtml(analysis.disease)}
                                    </h4>
                                    <p class="text-sm text-[#A0AABF]">${escapeHtml(analysis.description)}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-4 mt-4">
                                <div>
                                    <p class="text-sm text-[#A0AABF] mb-1">Confidence</p>
                                    <p class="text-2xl font-semibold" data-testid="confidence-percentage">${analysis.confidence}%</p>
                                </div>
                                
                                <div class="flex-1"></div>
                                
                                <div>
                                    <p class="text-sm text-[#A0AABF] mb-2">Risk Level</p>
                                    <span class="risk-badge ${riskClass}" data-testid="risk-badge">${riskLabel}</span>
                                </div>
                            </div>
                        </div>
                        
                        <p class="text-sm text-[#A0AABF] mt-4">
                            ⚠️ This is an AI-generated analysis. Please consult a healthcare professional for proper diagnosis.
                        </p>
                    </div>
                </div>
            </div>
        `;

        chatContainer.appendChild(responseDiv);

        // Re-initialize Lucide icons for the new message
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        scrollToBottom();
    }

    // Start New Chat
    window.startNewChat = function () {
        // Clear all messages except the welcome message
        const messages = chatContainer.querySelectorAll('.flex');
        messages.forEach((msg, index) => {
            if (index > 0) msg.remove();
        });
        symptomInput.focus();
    };

    // Scroll to Bottom
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
