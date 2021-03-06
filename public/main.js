class App {

    constructor() {
        this.meals = [];
        document.getElementById('form-entry').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addMeal({
                id: Date.now(),
                title: document.getElementById('title').value,
                calories: parseInt(document.getElementById('calories').value)
            });
        })
    }

    init() {
        this.meals = [
            { id: 1, title: 'Breakfast Burrito', calories: 150 },
            { id: 2, title: 'Turkey Sandwich', calories: 600 },
            { id: 3, title: 'Roasted Chicken', calories: 725 }
        ];
        this.render();
    }

    addMeal(meal) {
        document.getElementById('meals').appendChild(this.createMealElement(meal));
        this.meals.push(meal);
        this.updateTotalCalories();
    }

    deleteMeal(id) {
        let index = this.meals.map(o => o.id).indexOf(id);
        this.meals.splice(index, 1);
        this.updateTotalCalories();
    }

    updateTotalCalories() {
        let elTotal = document.getElementById('total');
        elTotal.textContent = this.meals.reduce((acc, o) => acc + o.calories, 0).toLocaleString();
    }

    createMealElement({ id, title, calories }) {
        let el = document.createElement('li');
        el.className = 'list-group-item d-flex justify-content-between align-items-center'
        el.innerHTML = `
          <div>
            <a href="#" class="remove">&times;</a>
            <span class="title">${title}</span>
          </div>
          <span class="calories badge badge-primary badge-pill">${calories}</span>
        `
        // when the 'x' delete link is clicked
        el.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            this.deleteMeal(id);
            el.remove();
        })
        return el;
    }

    render() {
        let fragment = document.createDocumentFragment()
        for (let meal of this.meals) {
            fragment.appendChild(this.createMealElement(meal));
        }
        let el = document.getElementById('meals');
        while (el.firstChild) {
            el.removeChild(el.firstChild); // empty the <div id="meals" />
        }
        el.appendChild(fragment);
        this.updateTotalCalories();
    }
}

let app = new App();
app.init();