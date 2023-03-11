import { CommonModule } from '@angular/common';
import { Attribute, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'expenses-tracker-delete-pocketbook-graphic',
  standalone: true,
  imports: [CommonModule],
  template: `<svg
      version="1.1"
      viewBox="0 0 700 575"
      [classList]="classes$ | async"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <path
          d="m601.56 17.5h-459.38c-30.156 0-54.688 24.531-54.688 54.688v350c0 6.0391 4.8984 10.938 10.938 10.938h144.95c-14.309 55.414 27.793 109.38 84.742 109.38 57.008 0 99.027-54.016 84.742-109.38h123.07c6.0391 0 10.938-4.8984 10.938-10.938v-21.875h54.688c6.0391 0 10.938-4.8984 10.938-10.938v-360.94c0-6.0391-4.8984-10.938-10.938-10.938zm-142.19 284.38c-24.125 0-43.75-19.625-43.75-43.75s19.625-43.75 43.75-43.75h131.25v87.5h-131.25zm-317.19-262.5h448.44v153.12h-43.75v-76.562c0-6.0391-4.8984-10.938-10.938-10.938h-393.75c-18.094 0-32.812-14.719-32.812-32.812s14.719-32.812 32.812-32.812zm185.94 481.25c-36.188 0-65.625-29.438-65.625-65.625 0-44.773 44.09-76.305 86.199-62.277 28.723 9.5625 38.82 34.273 38.734 34.164 4.1914 8.8242 6.3164 18.285 6.3164 28.113 0 36.188-29.438 65.625-65.625 65.625zm196.88-109.38h-121.09c-21.352-36.902-67.637-54.281-109.17-37.062-17.605 7.3047-32.727 20.359-42.391 37.062h-142.97v-295.34c9.5312 7.1445 20.988 10.961 32.812 10.961h382.81v65.625h-65.625c-36.188 0-65.625 29.438-65.625 65.625s29.438 65.625 65.625 65.625h65.625zm65.625-32.812h-43.75v-54.688h43.75z" />
        <path
          d="m470.31 225.31c-18.09 0-32.812 14.719-32.812 32.812s14.723 32.812 32.812 32.812c18.094 0 32.812-14.719 32.812-32.812s-14.719-32.812-32.812-32.812zm0 43.75c-6.0312 0-10.938-4.9062-10.938-10.938s4.9062-10.938 10.938-10.938 10.938 4.9062 10.938 10.938-4.9062 10.938-10.938 10.938z" />
        <path
          d="m207.81 159.69h-43.75c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938h43.75c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938z" />
        <path
          d="m295.31 159.69h-43.75c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938h43.75c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938z" />
        <path
          d="m382.81 159.69h-43.75c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938h43.75c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938z" />
        <path
          d="m426.56 181.56h43.75c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938h-43.75c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938z" />
        <path
          d="m207.81 356.56h-43.75c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938h43.75c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938z" />
        <path
          d="m470.31 356.56h-43.75c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938h43.75c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938z" />
        <path
          d="m360.94 444.06h-65.625c-6.0391 0-10.938 4.8984-10.938 10.938s4.8984 10.938 10.938 10.938h65.625c6.0391 0 10.938-4.8984 10.938-10.938s-4.8984-10.938-10.938-10.938z" />
      </g>
    </svg>

    <!-- Delete by Flatart from <a href="https://thenounproject.com/browse/icons/term/delete/" target="_blank" title="Delete Icons">Noun Project</a> --> `,
  styles: []
})
export class DeletePocketbookGraphicComponent {
  classes$ = new BehaviorSubject<string>('');
  constructor(@Attribute('class') public classes: string) {
    this.classes$.next(classes);
  }
}
