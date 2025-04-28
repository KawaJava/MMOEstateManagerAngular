import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer class="footer">
  © MMOEstateManager 2025. &nbsp;Wszystkie prawa zastrzeżone.
</footer>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
