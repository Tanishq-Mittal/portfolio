document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // MOBILE MENU
    // ================================

    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.onclick = () => {
            navLinks.classList.toggle('active');
        };
    }


    // ================================
    // TYPING ANIMATION
    // ================================

    if (typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: [
                'Certified SOC Analyst',
                'Python Programmer',
                'Frontend Developer'
            ],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }


    // ================================
    // IMAGE LIGHTBOX
    // ================================

    const profileImage = document.getElementById('profileImage');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    if (profileImage && lightbox && lightboxImg && closeBtn) {

        profileImage.onclick = () => {
            lightbox.style.display = 'block';
            lightboxImg.src = profileImage.src;
        };

        closeBtn.onclick = () => {
            lightbox.style.display = 'none';
        };

        lightbox.onclick = (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        };
    }


    // ================================
    // DETECT MOBILE
    // ================================

    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);


    // ================================
    // PARTICLES BACKGROUND
    // DISABLED ON MOBILE
    // ================================

    if (typeof particlesJS !== 'undefined' && !isMobile) {

        particlesJS('particles-js', {

            particles: {

                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },

                color: {
                    value: '#00eeff'
                },

                shape: {
                    type: 'circle'
                },

                opacity: {
                    value: 0.5,
                    random: false
                },

                size: {
                    value: 3,
                    random: true
                },

                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00eeff',
                    opacity: 0.4,
                    width: 1
                },

                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },

            interactivity: {

                detect_on: 'canvas',

                events: {

                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },

                    onclick: {
                        enable: true,
                        mode: 'push'
                    },

                    resize: true
                },

                modes: {

                    repulse: {
                        distance: 100
                    },

                    push: {
                        particles_nb: 4
                    }
                }
            },

            retina_detect: true
        });

    } else if (isMobile) {

        const particlesCanvas =
            document.getElementById('particles-js');

        if (particlesCanvas) {
            particlesCanvas.style.display = 'none';
        }
    }


    // ================================
    // HEADER SCROLL EFFECT
    // ================================

    const header = document.querySelector('header');

    if (header) {

        let ticking = false;

        window.addEventListener('scroll', () => {

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    header.classList.toggle(
                        'sticky',
                        window.scrollY > 100
                    );

                    ticking = false;
                });

                ticking = true;
            }

        }, { passive: true });
    }


    // ==================================================
    //                 AI CHATBOT
    // ==================================================

    const chatToggle =
        document.getElementById('chat-toggle');

    const chatBox =
        document.getElementById('chat-box');

    const closeChat =
        document.getElementById('close-chat');

    const sendBtn =
        document.getElementById('send-btn');

    const userInput =
        document.getElementById('user-input');

    const chatMessages =
        document.getElementById('chat-messages');

    const quickButtons =
        document.querySelectorAll('.quick-btn');


    // If chatbot HTML doesn't exist,
    // don't run chatbot code.

    if (
        !chatToggle ||
        !chatBox ||
        !closeChat ||
        !sendBtn ||
        !userInput ||
        !chatMessages
    ) {
        return;
    }


    // ================================
    // OPEN CHAT
    // ================================

    chatToggle.addEventListener('click', () => {

        chatBox.classList.add('active');

        userInput.focus();
    });


    // ================================
    // CLOSE CHAT
    // ================================

    closeChat.addEventListener('click', () => {

        chatBox.classList.remove('active');
    });


    // ================================
    // ADD USER MESSAGE
    // ================================

    function addUserMessage(message) {

        const messageDiv =
            document.createElement('div');

        messageDiv.className = 'user-message';

        messageDiv.textContent = message;

        chatMessages.appendChild(messageDiv);

        scrollChatToBottom();
    }


    // ================================
    // ADD BOT MESSAGE
    // ================================

    function addBotMessage(message) {

        const messageDiv =
            document.createElement('div');

        messageDiv.className = 'bot-message';

        messageDiv.textContent = message;

        chatMessages.appendChild(messageDiv);

        scrollChatToBottom();
    }


    // ================================
    // TYPING INDICATOR
    // ================================

    function showTyping() {

        const typingDiv =
            document.createElement('div');

        typingDiv.className = 'bot-message typing-indicator';

        typingDiv.id = 'ai-typing';

        typingDiv.textContent = 'AI is typing...';

        chatMessages.appendChild(typingDiv);

        scrollChatToBottom();
    }


    // ================================
    // REMOVE TYPING INDICATOR
    // ================================

    function removeTyping() {

        const typing =
            document.getElementById('ai-typing');

        if (typing) {
            typing.remove();
        }
    }


    // ================================
    // SCROLL CHAT
    // ================================

    function scrollChatToBottom() {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    // ================================
    // ASK AI
    // ================================

    async function askAI(message) {

        /*
         * IMPORTANT:
         *
         * Replace this URL with your
         * deployed Render backend URL.
         *
         * Example:
         *
         * https://portfolio-ai-backend.onrender.com/chat
         */

        const API_URL =
            'https://portfolio-backend-jsw2.onrender.com/chat';


        const response = await fetch(API_URL, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                message: message
            })
        });


        if (!response.ok) {

            throw new Error(
                'Server returned an error'
            );
        }


        const data =
            await response.json();


        return data.reply;
    }


    // ================================
    // SEND MESSAGE
    // ================================

    async function sendMessage() {

        const message =
            userInput.value.trim();


        // Don't send empty messages

        if (!message) {
            return;
        }


        // Show user message

        addUserMessage(message);


        // Clear input

        userInput.value = '';


        // Disable button while AI responds

        sendBtn.disabled = true;

        userInput.disabled = true;


        // Show typing

        showTyping();


        try {

            const reply =
                await askAI(message);


            // Remove typing

            removeTyping();


            // Show AI response

            addBotMessage(reply);


        } catch (error) {

            console.error(
                'AI Chat Error:',
                error
            );


            removeTyping();


            addBotMessage(
                'Sorry, I could not connect to the AI assistant. Please try again.'
            );

        } finally {

            // Enable input again

            sendBtn.disabled = false;

            userInput.disabled = false;

            userInput.focus();
        }
    }


    // ================================
    // SEND BUTTON
    // ================================

    sendBtn.addEventListener(
        'click',
        sendMessage
    );


    // ================================
    // ENTER KEY
    // ================================

    userInput.addEventListener(
        'keydown',
        (event) => {

            if (event.key === 'Enter') {

                event.preventDefault();

                sendMessage();
            }
        }
    );


    // ================================
    // QUICK QUESTIONS
    // ================================

    quickButtons.forEach(button => {

        button.addEventListener(
            'click',
            () => {

                const question =
                    button.textContent.trim();


                if (!question) {
                    return;
                }


                userInput.value =
                    question;


                sendMessage();
            }
        );
    });

});
