import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../../models/ingredient.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.scss']
})
export class IngredientAddComponent implements OnInit {
  ingredientName: string;
  ingredientAmount: number;
  ingredientIndex: number = null;

  constructor(private ingredientsService: IngredientsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.ingredientIndex = +params['id'];
        const ingredient = this.ingredientsService.getIngredient(this.ingredientIndex);
        this.ingredientName = ingredient.name;
        this.ingredientAmount = ingredient.amount;
      } else {
        this.ingredientIndex = null;
      }
    })
  }

  addIngredient(): void {
    console.log('Dit zijn de ingredienten:', this.ingredientName, this.ingredientAmount);
    this.ingredientsService.addIngredient(new Ingredient(this.ingredientName, this.ingredientAmount));
    this.ingredientName = null;
    this.ingredientAmount = null;
  }

  isDisabled(): boolean {
    return !this.ingredientName || !this.ingredientAmount;
  }
}
