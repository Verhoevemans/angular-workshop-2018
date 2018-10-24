import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IngredientsService {
  private ingredients: Ingredient[];
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor(private httpClient: HttpClient) {}

  getIngredient(index): Ingredient {
    return this.ingredients ? this.ingredients.slice(index, index + 1)[0] : null;
  }

  getIngredients(): Ingredient[] {
    if (this.ingredients) {
      return this.ingredients.slice();
    } else {
      this.httpClient.get<Ingredient[]>('https://ordina-fontys-workshop.firebaseio.com/ingredients.json')
        .subscribe((ingredients) => {
          if (ingredients) {
            this.ingredients = ingredients;
          } else {
            this.ingredients = [];
          }
          this.ingredientsChanged.next(this.ingredients.slice());
        });

      return [];
    }
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);

    this.httpClient.put(
      'https://ordina-fontys-workshop.firebaseio.com/ingredients.json',
      this.ingredients
    ).subscribe((ingredients: Ingredient[]) => {
      this.ingredientsChanged.next(ingredients);
    });
  }

  updateIngredient(index, ingredient) {
    if (ingredient) {
      this.ingredients.splice(index, 1, ingredient);
    } else {
      this.ingredients.splice(index, 1);
    }
    this.httpClient.put(
      'https://ordina-fontys-workshop.firebaseio.com/ingredients.json',
      this.ingredients
    ).subscribe((ingredients: Ingredient[]) => {
      this.ingredientsChanged.next(ingredients);
    });
  }
}
