import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../../models/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.scss']
})
export class IngredientAddComponent implements OnInit {
  ingredientName: string;
  ingredientAmount: number;
  ingredientIndex: number = null;

  constructor(private ingredientsService: IngredientsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.ingredientIndex = +params['id'];
        const ingredient = this.ingredientsService.getIngredient(this.ingredientIndex);
        if (ingredient) {
          this.ingredientName = ingredient.name;
          this.ingredientAmount = ingredient.amount;
        } else {
          this.router.navigate(['ingredients']);
        }
      } else {
        this.ingredientIndex = null;
      }
    })
  }

  addIngredient(): void {
    this.ingredientsService.addIngredient(new Ingredient(this.ingredientName, this.ingredientAmount));
    this.ingredientName = null;
    this.ingredientAmount = null;
  }

  deleteIngredient() {
    this.ingredientsService.updateIngredient(this.ingredientIndex, null);
    this.router.navigate(['ingredients']);
  };

  updateIngredient() {
    this.ingredientsService.updateIngredient(this.ingredientIndex, new Ingredient(this.ingredientName, this.ingredientAmount));
    this.router.navigate(['ingredients']);
  }

  isDisabled(): boolean {
    return !this.ingredientName || !this.ingredientAmount;
  }
}
