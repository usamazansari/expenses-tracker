import { CommonModule } from '@angular/common';
import { Attribute, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'expenses-tracker-logo-graphic',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      version="1.1"
      viewBox="0 0 700 575"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      [classList]="classes$ | async">
      <defs>
        <symbol id="t" overflow="visible">
          <path
            d="m3.6562-0.21875c-0.1875 0.09375-0.38672 0.16797-0.59375 0.21875-0.19922 0.050781-0.40625 0.078125-0.625 0.078125-0.66797 0-1.1992-0.17969-1.5938-0.54688-0.38672-0.375-0.57812-0.87891-0.57812-1.5156 0-0.64453 0.19141-1.1484 0.57812-1.5156 0.39453-0.375 0.92578-0.5625 1.5938-0.5625 0.21875 0 0.42578 0.027344 0.625 0.078125 0.20703 0.054687 0.40625 0.125 0.59375 0.21875v0.82812c-0.1875-0.125-0.375-0.21875-0.5625-0.28125-0.17969-0.0625-0.37109-0.09375-0.57812-0.09375-0.36719 0-0.65625 0.12109-0.875 0.35938-0.21094 0.23047-0.3125 0.55469-0.3125 0.96875 0 0.40625 0.10156 0.73047 0.3125 0.96875 0.21875 0.23047 0.50781 0.34375 0.875 0.34375 0.20703 0 0.39844-0.023437 0.57812-0.078125 0.1875-0.0625 0.375-0.16016 0.5625-0.29688z" />
        </symbol>
        <symbol id="b" overflow="visible">
          <path
            d="m2.6875-2.1719c-0.085938-0.039063-0.16797-0.070313-0.25-0.09375-0.085938-0.019531-0.16797-0.03125-0.25-0.03125-0.25 0-0.44531 0.085937-0.57812 0.25-0.125 0.15625-0.1875 0.38281-0.1875 0.67188v1.375h-0.96875v-2.9844h0.96875v0.48438c0.11328-0.19531 0.25-0.33594 0.40625-0.42188 0.16406-0.09375 0.35938-0.14062 0.57812-0.14062h0.10938c0.039063 0 0.09375 0.007812 0.15625 0.015625z" />
        </symbol>
        <symbol id="a" overflow="visible">
          <path
            d="m3.4375-1.5v0.26562h-2.2344c0.03125 0.23047 0.11328 0.40234 0.25 0.51562 0.13281 0.10547 0.32812 0.15625 0.57812 0.15625 0.20703 0 0.41406-0.023438 0.625-0.078125 0.20703-0.0625 0.42188-0.15625 0.64062-0.28125v0.73438c-0.21875 0.09375-0.44531 0.16406-0.67188 0.20312-0.23047 0.039062-0.45312 0.0625-0.67188 0.0625-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.47656 0.14453-0.85938 0.4375-1.1406 0.30078-0.28125 0.70703-0.42188 1.2188-0.42188 0.46875 0 0.84375 0.14062 1.125 0.42188s0.42188 0.66406 0.42188 1.1406zm-0.96875-0.32812c0-0.17578-0.058594-0.31641-0.17188-0.42188-0.10547-0.11328-0.24219-0.17188-0.40625-0.17188-0.1875 0-0.33984 0.054687-0.45312 0.15625-0.11719 0.10547-0.1875 0.25-0.21875 0.4375z" />
        </symbol>
        <symbol id="f" overflow="visible">
          <path
            d="m1.7969-1.3438c-0.19922 0-0.35156 0.039062-0.45312 0.10938-0.09375 0.0625-0.14062 0.16406-0.14062 0.29688 0 0.11719 0.035156 0.21094 0.10938 0.28125 0.082031 0.0625 0.19531 0.09375 0.34375 0.09375 0.17578 0 0.32812-0.0625 0.45312-0.1875s0.1875-0.28516 0.1875-0.48438v-0.10938zm1.4688-0.35938v1.7031h-0.96875v-0.4375c-0.125 0.17969-0.27344 0.30859-0.4375 0.39062-0.15625 0.082031-0.35156 0.125-0.57812 0.125-0.3125 0-0.57031-0.085938-0.76562-0.26562-0.1875-0.1875-0.28125-0.42188-0.28125-0.70312 0-0.35156 0.11719-0.61328 0.35938-0.78125 0.23828-0.16406 0.61719-0.25 1.1406-0.25h0.5625v-0.0625c0-0.15625-0.0625-0.26562-0.1875-0.32812-0.11719-0.070312-0.29688-0.10938-0.54688-0.10938-0.21094 0-0.40234 0.023437-0.57812 0.0625-0.17969 0.042969-0.33984 0.10156-0.48438 0.17188v-0.71875c0.19531-0.050781 0.39844-0.085938 0.60938-0.10938 0.20703-0.03125 0.41406-0.046875 0.625-0.046875 0.53906 0 0.92969 0.10938 1.1719 0.32812 0.23828 0.21094 0.35938 0.55469 0.35938 1.0312z" />
        </symbol>
        <symbol id="c" overflow="visible">
          <path
            d="m1.5-3.8438v0.85938h0.98438v0.67188h-0.98438v1.2812c0 0.13672 0.023438 0.23047 0.078125 0.28125 0.0625 0.042969 0.17578 0.0625 0.34375 0.0625h0.48438v0.6875h-0.8125c-0.38672 0-0.65625-0.078125-0.8125-0.23438s-0.23438-0.42188-0.23438-0.79688v-1.2812h-0.46875v-0.67188h0.46875v-0.85938z" />
        </symbol>
        <symbol id="l" overflow="visible">
          <path
            d="m2.5-2.5469v-1.6094h0.95312v4.1562h-0.95312v-0.4375c-0.13672 0.17969-0.28125 0.30859-0.4375 0.39062-0.15625 0.082031-0.33984 0.125-0.54688 0.125-0.375 0-0.68359-0.14453-0.92188-0.4375-0.23047-0.28906-0.34375-0.67188-0.34375-1.1406 0-0.45703 0.11328-0.83203 0.34375-1.125 0.23828-0.28906 0.54688-0.4375 0.92188-0.4375 0.19531 0 0.375 0.042969 0.53125 0.125 0.16406 0.085938 0.31641 0.21484 0.45312 0.39062zm-0.64062 1.9375c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875z" />
        </symbol>
        <symbol id="k" overflow="visible">
          <path
            d="m2.0469-0.60938c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875zm-0.625-1.9375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062v0.4375h-0.96875v-4.1562h0.96875z" />
        </symbol>
        <symbol id="j" overflow="visible">
          <path
            d="m0.0625-2.9844h0.95312l0.8125 2.0156 0.6875-2.0156h0.95312l-1.2656 3.2656c-0.125 0.33203-0.27344 0.56641-0.4375 0.70312-0.16797 0.13281-0.39062 0.20312-0.67188 0.20312h-0.54688v-0.64062h0.29688c0.16406 0 0.28516-0.027344 0.35938-0.078125 0.070313-0.054688 0.12891-0.14062 0.17188-0.26562l0.03125-0.09375z" />
        </symbol>
        <symbol id="e" overflow="visible">
          <path
            d="m0.5-3.9844h1.7031c0.50781 0 0.89844 0.11719 1.1719 0.34375 0.26953 0.21875 0.40625 0.53906 0.40625 0.95312 0 0.41797-0.13672 0.74219-0.40625 0.96875-0.27344 0.21875-0.66406 0.32812-1.1719 0.32812h-0.67188v1.3906h-1.0312zm1.0312 0.75v1.1094h0.5625c0.19531 0 0.34766-0.046875 0.45312-0.14062 0.11328-0.10156 0.17188-0.24219 0.17188-0.42188 0-0.17578-0.058594-0.3125-0.17188-0.40625-0.10547-0.09375-0.25781-0.14062-0.45312-0.14062z" />
        </symbol>
        <symbol id="i" overflow="visible">
          <path
            d="m3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z" />
        </symbol>
        <symbol id="s" overflow="visible">
          <path
            d="m3.2812-3.8594v0.84375c-0.21875-0.10156-0.43359-0.17578-0.64062-0.21875-0.21094-0.050781-0.40625-0.078125-0.59375-0.078125-0.25 0-0.43359 0.039062-0.54688 0.10938-0.11719 0.0625-0.17188 0.16797-0.17188 0.3125 0 0.10547 0.035156 0.1875 0.10938 0.25 0.082031 0.054687 0.22656 0.10156 0.4375 0.14062l0.4375 0.09375c0.44531 0.09375 0.75781 0.23047 0.9375 0.40625 0.1875 0.17969 0.28125 0.4375 0.28125 0.78125 0 0.4375-0.13281 0.76562-0.39062 0.98438-0.26172 0.21094-0.65625 0.3125-1.1875 0.3125-0.25 0-0.50781-0.027344-0.76562-0.078125-0.25-0.039062-0.50781-0.10938-0.76562-0.20312v-0.875c0.25781 0.13672 0.50391 0.24219 0.73438 0.3125 0.23828 0.0625 0.47266 0.09375 0.70312 0.09375 0.21875 0 0.38281-0.035156 0.5-0.10938 0.125-0.070312 0.1875-0.17578 0.1875-0.3125 0-0.125-0.042969-0.21875-0.125-0.28125-0.085937-0.070312-0.24609-0.13281-0.48438-0.1875l-0.39062-0.09375c-0.40625-0.082031-0.70312-0.21875-0.89062-0.40625-0.17969-0.1875-0.26562-0.44141-0.26562-0.76562 0-0.39453 0.125-0.69531 0.375-0.90625 0.25781-0.21875 0.62891-0.32812 1.1094-0.32812 0.22656 0 0.45703 0.023438 0.6875 0.0625 0.22656 0.03125 0.46875 0.078125 0.71875 0.14062z" />
        </symbol>
        <symbol id="h" overflow="visible">
          <path
            d="m3.2344-2.5c0.11328-0.17578 0.25391-0.3125 0.42188-0.40625 0.16406-0.10156 0.35156-0.15625 0.5625-0.15625 0.33203 0 0.58594 0.10938 0.76562 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625v1.8281h-0.96875v-1.5625c0.007813-0.019531 0.015625-0.039062 0.015625-0.0625v-0.10938c0-0.21875-0.03125-0.375-0.09375-0.46875s-0.16406-0.14062-0.29688-0.14062c-0.1875 0-0.33594 0.078125-0.4375 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-1.5625c0-0.33203-0.03125-0.54688-0.09375-0.64062-0.054688-0.09375-0.15234-0.14062-0.29688-0.14062-0.17969 0-0.32031 0.078125-0.42188 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.11328-0.17578 0.24219-0.30469 0.39062-0.39062 0.15625-0.082031 0.32812-0.125 0.51562-0.125 0.20703 0 0.39062 0.054688 0.54688 0.15625 0.15625 0.09375 0.27344 0.23047 0.35938 0.40625z" />
        </symbol>
        <symbol id="r" overflow="visible">
          <path
            d="m2.7969-2.8906v0.71875c-0.21094-0.082031-0.40625-0.14453-0.59375-0.1875-0.1875-0.039063-0.37109-0.0625-0.54688-0.0625-0.17969 0-0.3125 0.023437-0.40625 0.0625-0.085938 0.042969-0.125 0.10938-0.125 0.20312 0 0.085938 0.03125 0.14844 0.09375 0.1875 0.070312 0.042969 0.19531 0.074219 0.375 0.09375l0.15625 0.015625c0.48828 0.0625 0.81641 0.16797 0.98438 0.3125 0.17578 0.13672 0.26562 0.35938 0.26562 0.67188s-0.12109 0.55469-0.35938 0.71875c-0.23047 0.15625-0.57812 0.23438-1.0469 0.23438-0.19922 0-0.40625-0.015625-0.625-0.046875-0.21094-0.03125-0.42188-0.078125-0.64062-0.14062v-0.71875c0.1875 0.085937 0.37891 0.15234 0.57812 0.20312 0.20703 0.042969 0.41406 0.0625 0.625 0.0625 0.1875 0 0.32812-0.023438 0.42188-0.078125 0.09375-0.050781 0.14062-0.125 0.14062-0.21875s-0.039062-0.16016-0.10938-0.20312c-0.0625-0.039062-0.1875-0.070312-0.375-0.09375l-0.17188-0.015625c-0.42969-0.050781-0.73047-0.14844-0.90625-0.29688-0.16797-0.14453-0.25-0.36328-0.25-0.65625 0-0.32031 0.10938-0.55469 0.32812-0.70312 0.21875-0.15625 0.55078-0.23438 1-0.23438 0.17578 0 0.35938 0.015625 0.54688 0.046875 0.19531 0.023437 0.41016 0.0625 0.64062 0.125z" />
        </symbol>
        <symbol id="g" overflow="visible">
          <path
            d="m3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-4.1562h0.96875v1.6094c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z" />
        </symbol>
        <symbol id="q" overflow="visible">
          <path
            d="m2.4219-4.1562v0.625h-0.51562c-0.13672 0-0.23438 0.027344-0.29688 0.078125-0.054687 0.054687-0.078125 0.13672-0.078125 0.25v0.21875h0.82812v0.67188h-0.82812v2.3125h-0.95312v-2.3125h-0.46875v-0.67188h0.46875v-0.21875c0-0.32031 0.085937-0.5625 0.26562-0.71875 0.1875-0.15625 0.47266-0.23438 0.85938-0.23438z" />
        </symbol>
        <symbol id="d" overflow="visible">
          <path
            d="m1.875-2.375c-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.27344 0.21875 0.48438 0.21875 0.20703 0 0.36719-0.070313 0.48438-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.11719-0.15625-0.27734-0.23438-0.48438-0.23438zm0-0.6875c0.51953 0 0.92188 0.14062 1.2031 0.42188 0.28906 0.27344 0.4375 0.65234 0.4375 1.1406 0 0.5-0.14844 0.89062-0.4375 1.1719-0.28125 0.27344-0.68359 0.40625-1.2031 0.40625-0.51172 0-0.91406-0.13281-1.2031-0.40625-0.29297-0.28125-0.4375-0.67188-0.4375-1.1719 0-0.48828 0.14453-0.86719 0.4375-1.1406 0.28906-0.28125 0.69141-0.42188 1.2031-0.42188z" />
        </symbol>
        <symbol id="p" overflow="visible">
          <path
            d="m0.5-3.9844h1.1562l1.4375 2.7344v-2.7344h0.98438v3.9844h-1.1562l-1.4375-2.7344v2.7344h-0.98438z" />
        </symbol>
        <symbol id="o" overflow="visible">
          <path
            d="m0.42188-1.1719v-1.8125h0.96875v0.29688 0.60938 0.48438c0 0.24219 0.003906 0.41797 0.015625 0.53125 0.007812 0.10547 0.03125 0.17969 0.0625 0.21875 0.039062 0.0625 0.09375 0.11719 0.15625 0.15625 0.0625 0.03125 0.13281 0.046875 0.21875 0.046875 0.19531 0 0.35156-0.078125 0.46875-0.23438 0.11328-0.15625 0.17188-0.36719 0.17188-0.64062v-1.4688h0.95312v2.9844h-0.95312v-0.4375c-0.14844 0.17969-0.30469 0.30859-0.46875 0.39062-0.15625 0.082031-0.33594 0.125-0.53125 0.125-0.34375 0-0.60938-0.10156-0.79688-0.3125-0.17969-0.21875-0.26562-0.53125-0.26562-0.9375z" />
        </symbol>
        <symbol id="n" overflow="visible">
          <path
            d="m0.45312-2.9844h0.96875v2.9375c0 0.39453-0.10156 0.69531-0.29688 0.90625-0.1875 0.21875-0.46484 0.32812-0.82812 0.32812h-0.48438v-0.64062h0.17188c0.17578 0 0.29688-0.042969 0.35938-0.125 0.070312-0.074219 0.10938-0.23047 0.10938-0.46875zm0-1.1719h0.96875v0.78125h-0.96875z" />
        </symbol>
        <symbol id="m" overflow="visible">
          <path
            d="m2.875-2.8906v0.76562c-0.125-0.082031-0.25781-0.14453-0.39062-0.1875-0.13672-0.039062-0.27344-0.0625-0.40625-0.0625-0.27344 0-0.48047 0.078125-0.625 0.23438-0.14844 0.15625-0.21875 0.37109-0.21875 0.64062 0 0.28125 0.070313 0.5 0.21875 0.65625 0.14453 0.15625 0.35156 0.23438 0.625 0.23438 0.14453 0 0.28516-0.019531 0.42188-0.0625 0.13281-0.039063 0.25781-0.10938 0.375-0.20312v0.78125c-0.14844 0.0625-0.29688 0.10156-0.45312 0.125-0.15625 0.03125-0.3125 0.046875-0.46875 0.046875-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.48828 0.14844-0.86719 0.45312-1.1406 0.30078-0.28125 0.72266-0.42188 1.2656-0.42188 0.15625 0 0.3125 0.015625 0.46875 0.046875 0.15625 0.023437 0.30469 0.0625 0.45312 0.125z" />
        </symbol>
      </defs>
      <g>
        <path
          d="m122.32 504.36 179.73 37.445c9.5898 2 19.57-0.42969 27.172-6.6094 7.6016-6.1797 12.016-15.457 12.016-25.254v-11.203h43.75c9.2812-0.007813 18.176-3.6992 24.738-10.262 6.5586-6.5625 10.25-15.457 10.262-24.738v-35h-17.5v35c-0.003906 4.6406-1.8516 9.0898-5.1328 12.371-3.2773 3.2812-7.7266 5.125-12.367 5.1289h-43.75v-119.64c0-10.219-3.582-20.117-10.117-27.977-6.5352-7.8555-15.617-13.176-25.668-15.039l-188.09-34.832c-4.9961-0.92578-9.1914-4.293-11.176-8.9648-1.9844-4.6758-1.4922-10.035 1.3086-14.27 2.8047-4.2344 7.543-6.7812 12.621-6.7812h107.37v-17.5h-107.37c-8.6523 0.011718-16.945 3.4531-23.062 9.5703-6.1211 6.1172-9.5586 14.414-9.5703 23.066v192.66c0.035156 10.043 3.5078 19.773 9.8477 27.566 6.3359 7.7969 15.152 13.18 24.98 15.262zm-17.328-206.57c2.8867 1.5117 5.9883 2.582 9.1914 3.1719l188.09 34.832c6.0273 1.1172 11.477 4.3086 15.398 9.0234 3.9219 4.7148 6.0703 10.652 6.0703 16.785v148.34c0 4.5312-2.0391 8.8203-5.5547 11.676-3.5156 2.8555-8.1289 3.9805-12.562 3.0547l-179.73-37.441c-5.8984-1.25-11.188-4.4844-14.992-9.1602-3.8008-4.6758-5.8867-10.512-5.9062-16.539z" />
        <path
          d="m607.09 18.16c-3.2695-1.3555-7.0312-0.60547-9.5352 1.8945l-20.062 20.066-20.062-20.066c-3.418-3.4141-8.957-3.4141-12.375 0l-20.062 20.066-20.062-20.066c-3.418-3.4141-8.957-3.4141-12.375 0l-20.062 20.066-20.062-20.066c-3.418-3.4141-8.957-3.4141-12.375 0l-20.062 20.066-20.062-20.066c-2.5039-2.5-6.2656-3.25-9.5352-1.8945-3.2695 1.3555-5.4023 4.543-5.4023 8.082v70h-96.25c-11.598 0.015624-22.719 4.6289-30.922 12.828-8.2031 8.2031-12.816 19.324-12.828 30.922v157.5h17.5v-157.5c0-9.375 5.0039-18.043 13.125-22.73 8.1211-4.6914 18.129-4.6914 26.25 0 8.1211 4.6875 13.125 13.355 13.125 22.73v122.5c0.011718 11.602 4.625 22.723 12.828 30.922 8.2031 8.2031 19.324 12.816 30.922 12.828h96.25v83.875l-17.5 17.5-20.062-20.062c-3.418-3.4141-8.957-3.4141-12.375 0l-20.062 20.062-20.062-20.062-12.375 12.375 26.25 26.25c3.418 3.418 8.957 3.418 12.375 0l20.062-20.062 20.062 20.062c3.418 3.418 8.957 3.418 12.375 0l26.25-26.25c1.6406-1.6406 2.5625-3.8672 2.5625-6.1875v-87.5h96.25c11.598-0.011719 22.719-4.625 30.922-12.828 8.2031-8.1992 12.816-19.32 12.828-30.922v-236.25c0-3.5391-2.1328-6.7266-5.4023-8.082zm-248.35 270.58c-6.9609-0.007813-13.633-2.7734-18.551-7.6953-4.9219-4.9219-7.6914-11.594-7.6992-18.555v-122.5c0.011718-9.4688-3.0703-18.688-8.7734-26.25h61.273v148.75c-0.007813 6.9609-2.7773 13.633-7.6953 18.555-4.9219 4.9219-11.594 7.6875-18.555 7.6953zm236.25-26.25c-0.007813 6.9609-2.7773 13.633-7.6953 18.555-4.9219 4.9219-11.594 7.6875-18.555 7.6953h-175.02c5.6992-7.5625 8.7812-16.777 8.7695-26.25v-215.12l11.312 11.312c3.418 3.418 8.957 3.418 12.375 0l20.062-20.062 20.062 20.062c3.418 3.418 8.957 3.418 12.375 0l20.062-20.062 20.062 20.062c3.418 3.418 8.957 3.418 12.375 0l20.062-20.062 20.062 20.062c3.418 3.418 8.957 3.418 12.375 0l11.312-11.312z" />
        <path
          d="m498.75 122.49c6.9609 0 13.641-2.7656 18.562-7.6875 4.9219-4.9219 7.6875-11.598 7.6875-18.562 0-6.9609-2.7656-13.637-7.6875-18.559-4.9219-4.9258-11.602-7.6914-18.562-7.6914-6.9609 0-13.637 2.7656-18.562 7.6914-4.9219 4.9219-7.6875 11.598-7.6875 18.559 0.007812 6.9609 2.7773 13.633 7.6992 18.555 4.918 4.9219 11.59 7.6875 18.551 7.6953zm0-35c3.5391 0 6.7305 2.1328 8.0859 5.4023 1.3516 3.2695 0.60547 7.0352-1.8984 9.5352-2.5039 2.5039-6.2656 3.2539-9.5352 1.8984-3.2695-1.3555-5.4023-4.5469-5.4023-8.0859 0.003906-4.8281 3.9219-8.7422 8.75-8.75z" />
        <path d="m446.25 139.99h43.75v17.5h-43.75z" />
        <path d="m507.5 139.99h43.75v17.5h-43.75z" />
        <path d="m463.75 174.99h70v17.5h-70z" />
        <path d="m420 209.99h26.25v17.5h-26.25z" />
        <path d="m420 244.99h52.5v17.5h-52.5z" />
        <path d="m463.75 209.99h17.5v17.5h-17.5z" />
        <path d="m533.75 209.99h43.75v17.5h-43.75z" />
        <path d="m551.25 244.99h26.25v17.5h-26.25z" />
        <!-- <use x="70" y="576.40625" xlink:href="#t" />
        <use x="74.011719" y="576.40625" xlink:href="#b" />
        <use x="76.710938" y="576.40625" xlink:href="#a" />
        <use x="80.417969" y="576.40625" xlink:href="#f" />
        <use x="84.109375" y="576.40625" xlink:href="#c" />
        <use x="86.722656" y="576.40625" xlink:href="#a" />
        <use x="90.433594" y="576.40625" xlink:href="#l" />
        <use x="96.25" y="576.40625" xlink:href="#k" />
        <use x="100.167969" y="576.40625" xlink:href="#j" />
        <use x="105.636719" y="576.40625" xlink:href="#e" />
        <use x="109.644531" y="576.40625" xlink:href="#a" />
        <use x="113.351562" y="576.40625" xlink:href="#i" />
        <use x="117.246094" y="576.40625" xlink:href="#s" />
        <use x="121.183594" y="576.40625" xlink:href="#h" />
        <use x="126.882812" y="576.40625" xlink:href="#f" />
        <use x="130.574219" y="576.40625" xlink:href="#r" />
        <use x="133.828125" y="576.40625" xlink:href="#g" />
        <use x="137.722656" y="576.40625" xlink:href="#a" />
        <use x="141.429688" y="576.40625" xlink:href="#b" />
        <use x="70" y="581.875" xlink:href="#q" />
        <use x="72.378906" y="581.875" xlink:href="#b" />
        <use x="75.078125" y="581.875" xlink:href="#d" />
        <use x="78.832031" y="581.875" xlink:href="#h" />
        <use x="86.4375" y="581.875" xlink:href="#c" />
        <use x="89.050781" y="581.875" xlink:href="#g" />
        <use x="92.941406" y="581.875" xlink:href="#a" />
        <use x="98.554688" y="581.875" xlink:href="#p" />
        <use x="103.132812" y="581.875" xlink:href="#d" />
        <use x="106.890625" y="581.875" xlink:href="#o" />
        <use x="110.785156" y="581.875" xlink:href="#i" />
        <use x="116.582031" y="581.875" xlink:href="#e" />
        <use x="120.589844" y="581.875" xlink:href="#b" />
        <use x="123.285156" y="581.875" xlink:href="#d" />
        <use x="127.042969" y="581.875" xlink:href="#n" />
        <use x="128.917969" y="581.875" xlink:href="#a" />
        <use x="132.625" y="581.875" xlink:href="#m" />
        <use x="135.867188" y="581.875" xlink:href="#c" /> -->
      </g>
    </svg>
    <!-- expense by PenSmasher from <a href="https://thenounproject.com/browse/icons/term/expense/" target="_blank" title="expense Icons">Noun Project</a> -->
  `
})
export class LogoGraphicComponent {
  classes$ = new BehaviorSubject<string>('');
  constructor(@Attribute('class') public classes: string) {
    this.classes$.next(classes);
  }
}
