document.addEventListener("DOMContentLoaded", () => {
    
    
    let resteAVivre = 0;
    let budgetJournalierSafe = 0;
    let joursDansLeMois = 30;

    
    const inputIncome = document.getElementById("income");
    const inputExpenses = document.getElementById("fixed-expenses");
    const inputDays = document.getElementById("days");
    const inputTodaySpent = document.getElementById("today-spent");

    const displayRemaining = document.getElementById("display-remaining");
    const displayDailySafe = document.getElementById("display-daily-safe");
    const alertBox = document.getElementById("alert-box");

    const btnInit = document.getElementById("btn-init");
    const btnCheck = document.getElementById("btn-check");

    
    function initialiserBudget() {
        const income = parseFloat(inputIncome.value) || 0;
        const expenses = parseFloat(inputExpenses.value) || 0;
        joursDansLeMois = parseInt(inputDays.value) || 30;

        resteAVivre = income - expenses;
        budgetJournalierSafe = resteAVivre / joursDansLeMois;

        displayRemaining.textContent = `${resteAVivre.toFixed(2)} €`;
        displayDailySafe.textContent = `${budgetJournalierSafe.toFixed(2)} € / jour`;

        alertBox.classList.add("hidden");
    }

    
    function verifierDepenseDuJour() {
        const depenseDuJour = parseFloat(inputTodaySpent.value);

        if (isNaN(depenseDuJour)) {
            alert("Entre un montant valide pour ta dépense du jour.");
            return;
        }
        if (resteAVivre <= 0) {
            alert("Pense à cliquer d'abord sur 'Calculer mon budget de départ' à l'étape 1 !");
            return;
        }

        alertBox.classList.remove("hidden");

        if (depenseDuJour > budgetJournalierSafe) {
            
            const depassement = depenseDuJour - budgetJournalierSafe;
            const joursRestants = joursDansLeMois - 1;
            const nouveauResteAVivre = resteAVivre - depenseDuJour;
            const nouveauBudgetJournalier = nouveauResteAVivre / joursRestants;

            alertBox.className = "alert-box danger";
            alertBox.innerHTML = ` <strong>Attention !</strong> Tu as dépassé ton budget du jour de <strong>${depassement.toFixed(2)} €</strong>. <br>
            Tu peux te rattraper sur les <strong>${joursRestants} jours</strong> restants du mois en restant à <strong>${nouveauBudgetJournalier.toFixed(2)} € / jour</strong>.`;
        
        } else {
            
            const economie = budgetJournalierSafe - depenseDuJour;
            const joursRestants = joursDansLeMois - 1;
            const nouveauResteAVivre = resteAVivre - depenseDuJour;
            const nouveauBudgetJournalier = nouveauResteAVivre / joursRestants;

            alertBox.className = "alert-box success";
            alertBox.innerHTML = ` <strong>Bravo !</strong> Tu as respecté ton budget. Il te reste <strong>${economie.toFixed(2)} €</strong> sur ton quota d'aujourd'hui. <br>
            Ton budget pour les <strong>${joursRestants} jours</strong> restants passe à <strong>${nouveauBudgetJournalier.toFixed(2)} € / jour</strong>.`;
        }
    }

    
    btnInit.addEventListener("click", initialiserBudget);
    btnCheck.addEventListener("click", verifierDepenseDuJour);

    
    initialiserBudget();
});