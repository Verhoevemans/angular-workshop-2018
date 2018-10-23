import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { IngredientsService } from '../ingredients/ingredients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes = [
    { name: 'pizza', ingredients: [
        new Ingredient('tomatoes', 5), new Ingredient('cheese', 3)
      ]
    },
    { name: 'lasagna', ingredients: [
        new Ingredient('tomatoes', 5), new Ingredient('cheese', 2), new Ingredient('meat', 4)
      ]
    }
  ];


  constructor(private ingredientsService: IngredientsService, private router: Router) {}

  ngOnInit() {
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach( (ingredient) => {
      this.ingredientsService.addIngredient(ingredient);
    });
    this.router.navigate(['ingredients']);
  }
}
