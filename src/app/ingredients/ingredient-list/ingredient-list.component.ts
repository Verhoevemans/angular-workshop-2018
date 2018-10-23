import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  @Input() ingredients: Ingredient[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  editIngredient(index: number): void {
    this.router.navigate(['edit', index], {relativeTo: this.route});
  }
}
