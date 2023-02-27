import { CommonModule } from '@angular/common';
import { Attribute, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'expenses-tracker-empty-pocketbook-list-graphic',
  standalone: true,
  imports: [CommonModule],
  template: `<svg
      version="1.1"
      viewBox="0 0 700 575"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="s" overflow="visible">
          <path
            d="m3.125-0.1875c-0.15625 0.085938-0.32422 0.14844-0.5 0.1875-0.17969 0.039062-0.35938 0.0625-0.54688 0.0625-0.5625 0-1.0117-0.15625-1.3438-0.46875-0.33594-0.32031-0.5-0.75391-0.5-1.2969 0-0.53906 0.16406-0.96875 0.5-1.2812 0.33203-0.32031 0.78125-0.48438 1.3438-0.48438 0.1875 0 0.36719 0.023438 0.54688 0.0625 0.17578 0.042969 0.34375 0.10547 0.5 0.1875v0.70312c-0.15625-0.10156-0.32031-0.17969-0.48438-0.23438-0.15625-0.050781-0.32031-0.078125-0.48438-0.078125-0.32422 0-0.57422 0.10156-0.75 0.29688-0.17969 0.19922-0.26562 0.47656-0.26562 0.82812 0 0.35547 0.085937 0.63672 0.26562 0.84375 0.17578 0.19922 0.42578 0.29688 0.75 0.29688 0.16406 0 0.32812-0.023438 0.48438-0.078125 0.16406-0.050781 0.32812-0.13281 0.48438-0.25z" />
        </symbol>
        <symbol id="b" overflow="visible">
          <path
            d="m2.2969-1.8594c-0.074219-0.03125-0.14844-0.050781-0.21875-0.0625-0.074219-0.019531-0.14844-0.03125-0.21875-0.03125-0.21094 0-0.37109 0.070313-0.48438 0.20312-0.11719 0.13672-0.17188 0.32812-0.17188 0.57812v1.1719h-0.8125v-2.5625h0.8125v0.42188c0.10156-0.16406 0.22266-0.28516 0.35938-0.35938 0.14453-0.070312 0.3125-0.10938 0.5-0.10938h0.078125c0.039063 0 0.085937 0.007813 0.14062 0.015625z" />
        </symbol>
        <symbol id="a" overflow="visible">
          <path
            d="m2.9375-1.2812v0.23438h-1.9062c0.019531 0.1875 0.085938 0.32812 0.20312 0.42188 0.125 0.09375 0.28906 0.14062 0.5 0.14062 0.17578 0 0.35156-0.019531 0.53125-0.0625 0.17578-0.050781 0.36328-0.12891 0.5625-0.23438v0.625c-0.19922 0.074219-0.39844 0.125-0.59375 0.15625-0.1875 0.039062-0.38281 0.0625-0.57812 0.0625-0.46094 0-0.82031-0.11328-1.0781-0.34375-0.25-0.23828-0.375-0.57031-0.375-1 0-0.41406 0.125-0.73828 0.375-0.96875 0.25-0.23828 0.59766-0.35938 1.0469-0.35938 0.39453 0 0.71094 0.12109 0.95312 0.35938 0.23828 0.24219 0.35938 0.5625 0.35938 0.96875zm-0.82812-0.28125c0-0.14453-0.046875-0.26562-0.14062-0.35938-0.09375-0.10156-0.21484-0.15625-0.35938-0.15625-0.15625 0-0.28906 0.046875-0.39062 0.14062-0.09375 0.085938-0.15234 0.21094-0.17188 0.375z" />
        </symbol>
        <symbol id="i" overflow="visible">
          <path
            d="m1.5312-1.1562c-0.16797 0-0.29297 0.03125-0.375 0.09375-0.085938 0.0625-0.125 0.14844-0.125 0.25 0 0.10547 0.03125 0.1875 0.09375 0.25 0.070312 0.054688 0.17188 0.078125 0.29688 0.078125 0.14453 0 0.26953-0.050781 0.375-0.15625 0.11328-0.11328 0.17188-0.25391 0.17188-0.42188v-0.09375zm1.25-0.29688v1.4531h-0.8125v-0.375c-0.11719 0.15625-0.24219 0.27344-0.375 0.34375-0.13672 0.0625-0.30469 0.09375-0.5 0.09375-0.26172 0-0.47656-0.070312-0.64062-0.21875-0.16797-0.15625-0.25-0.35938-0.25-0.60938 0-0.30078 0.097656-0.51953 0.29688-0.65625 0.20703-0.14453 0.53516-0.21875 0.98438-0.21875h0.48438v-0.0625c0-0.125-0.054688-0.21875-0.15625-0.28125-0.10547-0.0625-0.26562-0.09375-0.48438-0.09375-0.17969 0-0.33984 0.023437-0.48438 0.0625-0.14844 0.03125-0.28906 0.085937-0.42188 0.15625v-0.625c0.17578-0.039063 0.35156-0.070313 0.53125-0.09375 0.17578-0.019531 0.35156-0.03125 0.53125-0.03125 0.45703 0 0.78516 0.089844 0.98438 0.26562 0.20703 0.17969 0.3125 0.47656 0.3125 0.89062z" />
        </symbol>
        <symbol id="c" overflow="visible">
          <path
            d="m1.2812-3.2812v0.71875h0.84375v0.59375h-0.84375v1.0781c0 0.125 0.019531 0.21094 0.0625 0.25 0.050781 0.042969 0.14844 0.0625 0.29688 0.0625h0.42188v0.57812h-0.70312c-0.32422 0-0.55469-0.066406-0.6875-0.20312-0.13672-0.13281-0.20312-0.36328-0.20312-0.6875v-1.0781h-0.40625v-0.59375h0.40625v-0.71875z" />
        </symbol>
        <symbol id="h" overflow="visible">
          <path
            d="m2.125-2.1875v-1.3594h0.82812v3.5469h-0.82812v-0.375c-0.10547 0.15625-0.22656 0.27344-0.35938 0.34375-0.13672 0.0625-0.29688 0.09375-0.48438 0.09375-0.3125 0-0.57422-0.125-0.78125-0.375-0.19922-0.25-0.29688-0.57031-0.29688-0.96875 0-0.38281 0.097656-0.70312 0.29688-0.95312 0.20703-0.25 0.46875-0.375 0.78125-0.375 0.17578 0 0.33203 0.039063 0.46875 0.10938 0.14453 0.0625 0.26953 0.16797 0.375 0.3125zm-0.53125 1.6562c0.17578 0 0.30469-0.0625 0.39062-0.1875 0.09375-0.125 0.14062-0.3125 0.14062-0.5625 0-0.23828-0.046875-0.42188-0.14062-0.54688-0.085937-0.125-0.21484-0.1875-0.39062-0.1875-0.17969 0-0.3125 0.0625-0.40625 0.1875-0.085938 0.125-0.125 0.30859-0.125 0.54688 0 0.25 0.039062 0.4375 0.125 0.5625 0.09375 0.125 0.22656 0.1875 0.40625 0.1875z" />
        </symbol>
        <symbol id="g" overflow="visible">
          <path
            d="m1.75-0.53125c0.17578 0 0.3125-0.0625 0.40625-0.1875s0.14062-0.3125 0.14062-0.5625c0-0.23828-0.046875-0.42188-0.14062-0.54688s-0.23047-0.1875-0.40625-0.1875c-0.17969 0-0.3125 0.0625-0.40625 0.1875s-0.14062 0.30859-0.14062 0.54688c0 0.25 0.046875 0.4375 0.14062 0.5625s0.22656 0.1875 0.40625 0.1875zm-0.54688-1.6562c0.11328-0.14453 0.23828-0.25 0.375-0.3125 0.13281-0.070312 0.29688-0.10938 0.48438-0.10938 0.3125 0 0.56641 0.125 0.76562 0.375 0.20703 0.25 0.3125 0.57031 0.3125 0.95312 0 0.39844-0.10547 0.71875-0.3125 0.96875-0.19922 0.25-0.45312 0.375-0.76562 0.375-0.1875 0-0.35156-0.03125-0.48438-0.09375-0.13672-0.070312-0.26172-0.1875-0.375-0.34375v0.375h-0.8125v-3.5469h0.8125z" />
        </symbol>
        <symbol id="f" overflow="visible">
          <path
            d="m0.0625-2.5625h0.8125l0.6875 1.7344 0.57812-1.7344h0.82812l-1.0781 2.7969c-0.11719 0.28906-0.24609 0.49219-0.39062 0.60938-0.13672 0.11328-0.32422 0.17188-0.5625 0.17188h-0.46875v-0.54688h0.25c0.14453 0 0.25-0.023438 0.3125-0.0625 0.0625-0.042969 0.10938-0.12109 0.14062-0.23438l0.03125-0.078125z" />
        </symbol>
        <symbol id="e" overflow="visible">
          <path d="m0.39062-2.5625h0.8125v2.5625h-0.8125zm0-0.98438h0.8125v0.65625h-0.8125z" />
        </symbol>
        <symbol id="k" overflow="visible">
          <path
            d="m2.9688-1.5625v1.5625h-0.82812v-1.1875c0-0.21875-0.007813-0.36719-0.015625-0.45312-0.011719-0.082031-0.027344-0.14453-0.046875-0.1875-0.03125-0.050781-0.078125-0.09375-0.14062-0.125-0.054688-0.03125-0.11719-0.046875-0.1875-0.046875-0.16797 0-0.30469 0.070312-0.40625 0.20312-0.09375 0.125-0.14062 0.30859-0.14062 0.54688v1.25h-0.8125v-2.5625h0.8125v0.375c0.125-0.14453 0.25391-0.25 0.39062-0.3125 0.14453-0.070312 0.30078-0.10938 0.46875-0.10938 0.28906 0 0.51562 0.089844 0.67188 0.26562 0.15625 0.17969 0.23438 0.4375 0.23438 0.78125z" />
        </symbol>
        <symbol id="j" overflow="visible">
          <path
            d="m2.0781-3.5469v0.53125h-0.45312c-0.11719 0-0.19922 0.023437-0.25 0.0625-0.042969 0.042969-0.0625 0.11719-0.0625 0.21875v0.17188h0.70312v0.59375h-0.70312v1.9688h-0.8125v-1.9688h-0.40625v-0.59375h0.40625v-0.17188c0-0.28125 0.070312-0.48438 0.21875-0.60938 0.15625-0.13281 0.39844-0.20312 0.73438-0.20312z" />
        </symbol>
        <symbol id="d" overflow="visible">
          <path
            d="m1.6094-2.0312c-0.17969 0-0.32031 0.070312-0.42188 0.20312-0.09375 0.125-0.14062 0.30859-0.14062 0.54688 0 0.25 0.046875 0.44531 0.14062 0.57812 0.10156 0.125 0.24219 0.1875 0.42188 0.1875 0.17578 0 0.3125-0.0625 0.40625-0.1875 0.09375-0.13281 0.14062-0.32812 0.14062-0.57812 0-0.23828-0.046875-0.42188-0.14062-0.54688-0.09375-0.13281-0.23047-0.20312-0.40625-0.20312zm0-0.57812c0.4375 0 0.78125 0.12109 1.0312 0.35938 0.25 0.23047 0.375 0.55469 0.375 0.96875 0 0.42969-0.125 0.76172-0.375 1-0.25 0.23047-0.59375 0.34375-1.0312 0.34375s-0.78125-0.11328-1.0312-0.34375c-0.25-0.23828-0.375-0.57031-0.375-1 0-0.41406 0.125-0.73828 0.375-0.96875 0.25-0.23828 0.59375-0.35938 1.0312-0.35938z" />
        </symbol>
        <symbol id="r" overflow="visible">
          <path
            d="m2.7656-2.125c0.10156-0.16406 0.22266-0.28516 0.35938-0.35938 0.14453-0.082031 0.30078-0.125 0.46875-0.125 0.28906 0 0.51562 0.089844 0.67188 0.26562 0.15625 0.17969 0.23438 0.4375 0.23438 0.78125v1.5625h-0.82812v-1.3281-0.0625c0.007813-0.019531 0.015625-0.050781 0.015625-0.09375 0-0.17578-0.03125-0.30469-0.09375-0.39062-0.054688-0.082031-0.13672-0.125-0.25-0.125-0.15625 0-0.27734 0.0625-0.35938 0.1875-0.085937 0.125-0.125 0.3125-0.125 0.5625v1.25h-0.82812v-1.3281c0-0.28125-0.027344-0.46094-0.078125-0.54688-0.042969-0.082031-0.125-0.125-0.25-0.125-0.15625 0-0.28125 0.070312-0.375 0.20312-0.085937 0.125-0.125 0.30859-0.125 0.54688v1.25h-0.8125v-2.5625h0.8125v0.375c0.10156-0.13281 0.21875-0.23828 0.34375-0.3125 0.13281-0.070312 0.28125-0.10938 0.4375-0.10938 0.17578 0 0.33203 0.042969 0.46875 0.125 0.13281 0.085937 0.23828 0.20312 0.3125 0.35938z" />
        </symbol>
        <symbol id="q" overflow="visible">
          <path
            d="m2.9688-1.5625v1.5625h-0.82812v-1.1875c0-0.21875-0.007813-0.36719-0.015625-0.45312-0.011719-0.082031-0.027344-0.14453-0.046875-0.1875-0.03125-0.050781-0.078125-0.09375-0.14062-0.125-0.054688-0.03125-0.11719-0.046875-0.1875-0.046875-0.16797 0-0.30469 0.070312-0.40625 0.20312-0.09375 0.125-0.14062 0.30859-0.14062 0.54688v1.25h-0.8125v-3.5469h0.8125v1.3594c0.125-0.14453 0.25391-0.25 0.39062-0.3125 0.14453-0.070312 0.30078-0.10938 0.46875-0.10938 0.28906 0 0.51562 0.089844 0.67188 0.26562 0.15625 0.17969 0.23438 0.4375 0.23438 0.78125z" />
        </symbol>
        <symbol id="p" overflow="visible">
          <path
            d="m0.42188-3.4062h0.98438l1.25 2.3438v-2.3438h0.82812v3.4062h-0.98438l-1.2344-2.3438v2.3438h-0.84375z" />
        </symbol>
        <symbol id="o" overflow="visible">
          <path
            d="m0.35938-1v-1.5625h0.82812v0.26562 0.51562 0.42188c0 0.21094 0.003906 0.35938 0.015625 0.45312 0.007813 0.085938 0.023437 0.14844 0.046875 0.1875 0.03125 0.054688 0.070312 0.09375 0.125 0.125 0.0625 0.03125 0.125 0.046875 0.1875 0.046875 0.17578 0 0.3125-0.0625 0.40625-0.1875 0.09375-0.13281 0.14062-0.32031 0.14062-0.5625v-1.2656h0.82812v2.5625h-0.82812v-0.375c-0.11719 0.15625-0.24609 0.27344-0.39062 0.34375-0.13672 0.0625-0.28906 0.09375-0.45312 0.09375-0.29297 0-0.51562-0.085938-0.67188-0.26562-0.15625-0.1875-0.23438-0.45312-0.23438-0.79688z" />
        </symbol>
        <symbol id="n" overflow="visible">
          <path
            d="m0.42188-3.4062h1.4688c0.42578 0 0.75391 0.10156 0.98438 0.29688 0.23828 0.1875 0.35938 0.46094 0.35938 0.8125 0 0.35547-0.12109 0.63281-0.35938 0.82812-0.23047 0.1875-0.55859 0.28125-0.98438 0.28125h-0.57812v1.1875h-0.89062zm0.89062 0.64062v0.95312h0.48438c0.16406 0 0.29688-0.039062 0.39062-0.125 0.09375-0.082031 0.14062-0.20312 0.14062-0.35938 0-0.14453-0.046875-0.25781-0.14062-0.34375-0.09375-0.082031-0.22656-0.125-0.39062-0.125z" />
        </symbol>
        <symbol id="m" overflow="visible">
          <path
            d="m0.39062-2.5625h0.8125v2.5156c0 0.34375-0.085937 0.60156-0.25 0.78125-0.15625 0.1875-0.39062 0.28125-0.70312 0.28125h-0.40625v-0.54688h0.14062c0.15625 0 0.25781-0.039062 0.3125-0.10938 0.0625-0.0625 0.09375-0.19922 0.09375-0.40625zm0-0.98438h0.8125v0.65625h-0.8125z" />
        </symbol>
        <symbol id="l" overflow="visible">
          <path
            d="m2.4531-2.4688v0.65625c-0.10547-0.070312-0.21484-0.125-0.32812-0.15625-0.11719-0.039062-0.23047-0.0625-0.34375-0.0625-0.23047 0-0.41406 0.070312-0.54688 0.20312-0.125 0.125-0.1875 0.30859-0.1875 0.54688 0 0.24219 0.0625 0.42969 0.1875 0.5625 0.13281 0.13672 0.31641 0.20312 0.54688 0.20312 0.125 0 0.24219-0.015625 0.35938-0.046875 0.11328-0.039062 0.21875-0.10156 0.3125-0.1875v0.67188c-0.125 0.054688-0.25781 0.085938-0.39062 0.10938-0.125 0.019531-0.25781 0.03125-0.39062 0.03125-0.46094 0-0.82031-0.11328-1.0781-0.34375-0.26172-0.23828-0.39062-0.57031-0.39062-1 0-0.41406 0.12891-0.73828 0.39062-0.96875 0.25781-0.23828 0.61719-0.35938 1.0781-0.35938 0.13281 0 0.26562 0.011719 0.39062 0.03125 0.13281 0.023437 0.26562 0.058594 0.39062 0.10938z" />
        </symbol>
      </defs>
      <g>
        <path
          d="m312.67 364h-37.332c-5.1562 0-9.332-4.1797-9.332-9.332 0-5.1523 4.1797-9.332 9.332-9.332h37.332c5.1562 0 9.332 4.1797 9.332 9.332 0 5.1523-4.1797 9.332-9.332 9.332z" />
        <path
          d="m574 364h-37.332c-5.1523 0-9.332-4.1797-9.332-9.332 0-5.1523 4.1797-9.332 9.332-9.332h37.332c5.1523 0 9.332 4.1797 9.332 9.332 0 5.1523-4.1797 9.332-9.332 9.332z" />
        <path
          d="m574 233.33h-298.67c-5.1562 0-9.332-4.1797-9.332-9.332 0-5.1562 4.1797-9.332 9.332-9.332h298.67c5.1523 0 9.332 4.1797 9.332 9.332 0 5.1562-4.1797 9.332-9.332 9.332z" />
        <path
          d="m574 102.67h-298.67c-5.1562 0-9.332-4.1797-9.332-9.332 0-5.1562 4.1797-9.332 9.332-9.332h298.67c5.1523 0 9.332 4.1797 9.332 9.332 0 5.1523-4.1797 9.332-9.332 9.332z" />
        <path
          d="m200.67 140h-74.668c-5.1562 0-9.332-4.1797-9.332-9.332v-74.668c0-5.1562 4.1797-9.332 9.332-9.332h74.668c5.1562 0 9.332 4.1797 9.332 9.332v74.668c0 5.1523-4.1797 9.332-9.332 9.332zm-65.336-18.668h56v-56h-56z" />
        <path
          d="m200.67 270.67h-74.668c-5.1562 0-9.332-4.1797-9.332-9.332v-74.668c0-5.1562 4.1797-9.332 9.332-9.332h74.668c5.1562 0 9.332 4.1797 9.332 9.332v74.668c0 5.1523-4.1797 9.332-9.332 9.332zm-65.336-18.668h56v-56h-56z" />
        <path
          d="m200.67 401.33h-74.668c-5.1562 0-9.332-4.1797-9.332-9.332v-74.668c0-5.1523 4.1797-9.332 9.332-9.332h74.668c5.1562 0 9.332 4.1797 9.332 9.332v74.668c0 5.1523-4.1797 9.332-9.332 9.332zm-65.336-18.664h56v-56h-56z" />
        <path
          d="m424.67 513.33c-66.902 0-121.33-54.43-121.33-121.33s54.43-121.33 121.33-121.33c66.902 0 121.33 54.43 121.33 121.33s-54.43 121.33-121.33 121.33zm0-224c-56.609 0-102.67 46.055-102.67 102.67 0 56.609 46.055 102.67 102.67 102.67 56.609 0 102.67-46.055 102.67-102.67-0.003907-56.609-46.059-102.67-102.67-102.67z" />
        <path
          d="m490 466.67c-2.3906 0-4.7773-0.91016-6.5977-2.7344l-130.67-130.67c-3.6445-3.6445-3.6445-9.5547 0-13.199 3.6445-3.6445 9.5547-3.6445 13.199 0l130.67 130.67c3.6445 3.6445 3.6445 9.5547 0 13.199-1.8242 1.8203-4.2109 2.7344-6.6016 2.7344z" />
        <!-- <use x="70" y="574" xlink:href="#s" />
        <use x="73.425781" y="574" xlink:href="#b" />
        <use x="75.726562" y="574" xlink:href="#a" />
        <use x="78.890625" y="574" xlink:href="#i" />
        <use x="82.039062" y="574" xlink:href="#c" />
        <use x="84.269531" y="574" xlink:href="#a" />
        <use x="87.4375" y="574" xlink:href="#h" />
        <use x="92.402344" y="574" xlink:href="#g" />
        <use x="95.742188" y="574" xlink:href="#f" />
        <use x="100.410156" y="574" xlink:href="#e" />
        <use x="102.007812" y="574" xlink:href="#g" />
        <use x="105.347656" y="574" xlink:href="#b" />
        <use x="107.648438" y="574" xlink:href="#i" />
        <use x="110.800781" y="574" xlink:href="#k" />
        <use x="114.121094" y="574" xlink:href="#h" />
        <use x="117.460938" y="574" xlink:href="#e" />
        <use x="119.0625" y="574" xlink:href="#j" />
        <use x="121.09375" y="574" xlink:href="#f" />
        <use x="70" y="578.667969" xlink:href="#j" />
        <use x="72.03125" y="578.667969" xlink:href="#b" />
        <use x="74.332031" y="578.667969" xlink:href="#d" />
        <use x="77.539062" y="578.667969" xlink:href="#r" />
        <use x="84.023438" y="578.667969" xlink:href="#c" />
        <use x="86.257812" y="578.667969" xlink:href="#q" />
        <use x="89.578125" y="578.667969" xlink:href="#a" />
        <use x="94.367188" y="578.667969" xlink:href="#p" />
        <use x="98.273438" y="578.667969" xlink:href="#d" />
        <use x="101.480469" y="578.667969" xlink:href="#o" />
        <use x="104.800781" y="578.667969" xlink:href="#k" />
        <use x="109.75" y="578.667969" xlink:href="#n" />
        <use x="113.167969" y="578.667969" xlink:href="#b" />
        <use x="115.46875" y="578.667969" xlink:href="#d" />
        <use x="118.675781" y="578.667969" xlink:href="#m" />
        <use x="120.277344" y="578.667969" xlink:href="#a" />
        <use x="123.441406" y="578.667969" xlink:href="#l" />
        <use x="126.207031" y="578.667969" xlink:href="#c" /> -->
      </g>
    </svg>

    <!-- bulleted by ibrandify from <a href="https://thenounproject.com/browse/icons/term/bulleted/" target="_blank" title="bulleted Icons">Noun Project</a> --> `
})
export class EmptyPocketbookListGraphicComponent {
  classes$ = new BehaviorSubject<string>('');
  constructor(@Attribute('class') public classes: string) {
    this.classes$.next(classes);
  }
}
