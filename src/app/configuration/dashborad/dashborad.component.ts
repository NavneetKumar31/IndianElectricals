import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})

export class DashboradComponent implements OnInit {

  daily_summary = [];

  constructor() { }

  ngOnInit() {
    this.calculateNetProfit();
  }

  calculateNetProfit() {
    const items = [
      {
        'name': 'Nokia 6.0',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 10
      },
      {
        'name': 'Moto G5 plus',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Honor Lite 9N',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Pocco F1',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Nokia 6.0',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Nokia 6.0',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Nokia 6.0',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Nokia 6.0',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      },
      {
        'name': 'Nokia 6.0',
        'selling_price': 7000,
        'purchase_price': 6500,
        'sold_items': 10,
        'remaining_items': 5
      }
    ];
    items.forEach(item => {
      const net_profit = (item.selling_price - item.purchase_price) * item.sold_items
      const newItem = {
        name: item.name,
        selling_price: item.selling_price,
        purchase_price: item.purchase_price,
        sold_items: item.sold_items,
        net_profit: net_profit,
        remaining_items: item.remaining_items
      }
      this.daily_summary.push(newItem);
    });
  }
}
