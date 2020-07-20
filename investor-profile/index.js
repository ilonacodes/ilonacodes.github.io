(() => {
    const submitButton = document.querySelector('.submit');

    const render = () => {
        Array.from(document.querySelectorAll('.question'))
            .forEach((container, index) => {
                const questionTitleElem = container.querySelector('.title');
                const question = questions[index];
                questionTitleElem.textContent = question.title;

                Array.from(container.querySelectorAll('.option'))
                    .forEach((element, optionIndex) => {
                        const option = question.options[optionIndex];
                        element.textContent = option.answer;

                        element.classList.toggle(
                            'selected',
                            question.chosen === option.letter,
                        );
                        element.addEventListener('click', () => {
                            question.chosen = option.letter;
                            render();
                        });
                    });
            });

        submitButton.toggleAttribute('disabled', !validateAnswers());
    };

    const counts = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
    };

    const outcomes = {
        conservative: 'Conservative Investor',
        balanced: 'Balanced Investor',
        growth: 'Growth Investor',
        aggressive: 'Aggressive Growth Investor',
    };

    const weights = {
        'A': -3,
        'B': -2,
        'C': 2,
        'D': 3,
    };

    const formIds = {
        conservative: '927796',
        balanced: '927805',
        growth: '927807',
        aggressive: '927808',
    };

    const validateAnswers = () =>
        questions.every(q => !!q.chosen);

    const determineInvestorType = () => {
        questions.forEach(question => {
            counts[question.chosen]++;
        });

        let score = 0;
        Object.keys(counts).forEach(letter => {
            score += weights[letter] * counts[letter];
        });

        let investorType;
        if (score < -5) {
            investorType = 'conservative';
        } else if (score < 5) {
            investorType = 'balanced';
        } else if (score < 10) {
            investorType = 'growth';
        } else {
            investorType = 'aggressive';
        }

        return {
            investorType: investorType,
        };
    };

    const showForm = (data) => {
        const waitForEmailInput = () => {
            const frame = container.querySelector('iframe');
            if (!frame) {
                setTimeout(waitForEmailInput, 200);
                return;
            }

            const email = frame.contentDocument.querySelector('input[type=email]');
            if (!email) {
                setTimeout(waitForEmailInput, 200);
                return;
            }

            submitButton.remove();
        };

        console.log(data);

        const container = document.querySelector('.submit-form-placeholder');
        const formId = formIds[data.investorType];
        const form = document.createElement('div');
        form.classList.add('mailmunch-forms-widget-' + formId);

        container.appendChild(form);

        window.mailmunch && window.mailmunch.pageview();
        setTimeout(waitForEmailInput, 400);
    };

    submitButton.addEventListener('click', () => {
        if (!validateAnswers()) return;

        submitButton.toggleAttribute('disabled', true);
        submitButton.textContent = 'Processing…';

        const data = determineInvestorType();
        showForm(data);
    });

    render();
})();
