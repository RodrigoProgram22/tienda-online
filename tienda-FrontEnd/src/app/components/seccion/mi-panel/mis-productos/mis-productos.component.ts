import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css'],
})
export class MisProductosComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
