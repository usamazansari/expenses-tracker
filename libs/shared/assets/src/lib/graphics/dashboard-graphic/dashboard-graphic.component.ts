import { CommonModule } from '@angular/common';
import { Attribute, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'expenses-tracker-dashboard-graphic',
  standalone: true,
  imports: [CommonModule],
  template: `<svg
      version="1.1"
      viewBox="0 0 700 575"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      [classList]="classes$ | async">
      <defs>
        <symbol id="p" overflow="visible">
          <path
            d="m29.312-1.75c-1.5117 0.78125-3.0898 1.3711-4.7344 1.7656-1.6367 0.40625-3.3398 0.60938-5.1094 0.60938-5.3125 0-9.5273-1.4844-12.641-4.4531-3.1055-2.9688-4.6562-7-4.6562-12.094s1.5508-9.125 4.6562-12.094c3.1133-2.9688 7.3281-4.4531 12.641-4.4531 1.7695 0 3.4727 0.19922 5.1094 0.59375 1.6445 0.39844 3.2227 0.99219 4.7344 1.7812v6.5938c-1.5312-1.0391-3.0391-1.8008-4.5156-2.2812-1.4805-0.48828-3.0391-0.73438-4.6719-0.73438-2.9375 0-5.2461 0.94531-6.9219 2.8281-1.6797 1.875-2.5156 4.4648-2.5156 7.7656 0 3.293 0.83594 5.8828 2.5156 7.7656 1.6758 1.875 3.9844 2.8125 6.9219 2.8125 1.6328 0 3.1914-0.23828 4.6719-0.71875 1.4766-0.48828 2.9844-1.2539 4.5156-2.2969z" />
        </symbol>
        <symbol id="j" overflow="visible">
          <path
            d="m21.453-17.406c-0.67969-0.3125-1.3516-0.53906-2.0156-0.6875-0.65625-0.15625-1.3203-0.23438-1.9844-0.23438-1.9688 0-3.4844 0.63281-4.5469 1.8906-1.0547 1.2617-1.5781 3.0703-1.5781 5.4219v11.016h-7.6562v-23.922h7.6562v3.9219c0.97656-1.5625 2.1016-2.7031 3.375-3.4219 1.2812-0.71875 2.8125-1.0781 4.5938-1.0781 0.25 0 0.52344 0.011719 0.82812 0.03125 0.30078 0.023438 0.73438 0.070312 1.2969 0.14062z" />
        </symbol>
        <symbol id="b" overflow="visible">
          <path
            d="m27.562-12.031v2.1875h-17.891c0.1875 1.793 0.83203 3.1367 1.9375 4.0312 1.1133 0.89844 2.6719 1.3438 4.6719 1.3438 1.6016 0 3.25-0.23438 4.9375-0.70312 1.6875-0.47656 3.4219-1.2031 5.2031-2.1719v5.8906c-1.8047 0.6875-3.6094 1.2031-5.4219 1.5469-1.8125 0.35156-3.6211 0.53125-5.4219 0.53125-4.3359 0-7.7031-1.0977-10.109-3.2969-2.3984-2.207-3.5938-5.2969-3.5938-9.2656 0-3.9062 1.1758-6.9727 3.5312-9.2031 2.3633-2.2383 5.6094-3.3594 9.7344-3.3594 3.7578 0 6.7695 1.1367 9.0312 3.4062 2.2578 2.2617 3.3906 5.2812 3.3906 9.0625zm-7.8594-2.5312c0-1.457-0.42969-2.6289-1.2812-3.5156-0.84375-0.89453-1.9492-1.3438-3.3125-1.3438-1.4922 0-2.6992 0.41797-3.625 1.25-0.91797 0.83594-1.4922 2.0391-1.7188 3.6094z" />
        </symbol>
        <symbol id="i" overflow="visible">
          <path
            d="m14.391-10.766c-1.5938 0-2.793 0.27344-3.5938 0.8125-0.80469 0.54297-1.2031 1.3398-1.2031 2.3906 0 0.96875 0.32031 1.7305 0.96875 2.2812 0.64453 0.54297 1.5469 0.8125 2.7031 0.8125 1.4375 0 2.6445-0.51562 3.625-1.5469 0.98828-1.0312 1.4844-2.3203 1.4844-3.875v-0.875zm11.688-2.8906v13.656h-7.7031v-3.5469c-1.0312 1.4492-2.1875 2.5078-3.4688 3.1719s-2.8398 1-4.6719 1c-2.4805 0-4.4961-0.72266-6.0469-2.1719-1.543-1.4453-2.3125-3.3203-2.3125-5.625 0-2.8125 0.96094-4.8672 2.8906-6.1719 1.9375-1.3125 4.9688-1.9688 9.0938-1.9688h4.5156v-0.60938c0-1.207-0.48047-2.0938-1.4375-2.6562-0.94922-0.5625-2.4375-0.84375-4.4688-0.84375-1.6367 0-3.1562 0.16797-4.5625 0.5-1.4062 0.32422-2.7188 0.8125-3.9375 1.4688v-5.8281c1.6445-0.40625 3.2891-0.70703 4.9375-0.90625 1.6562-0.20703 3.3047-0.3125 4.9531-0.3125 4.3203 0 7.4375 0.85547 9.3438 2.5625 1.9141 1.6992 2.875 4.4609 2.875 8.2812z" />
        </symbol>
        <symbol id="h" overflow="visible">
          <path
            d="m12.031-30.719v6.7969h7.875v5.4688h-7.875v10.141c0 1.1172 0.21875 1.8711 0.65625 2.2656 0.4375 0.38672 1.3125 0.57812 2.625 0.57812h3.9375v5.4688h-6.5625c-3.0234 0-5.1641-0.62891-6.4219-1.8906-1.2617-1.2578-1.8906-3.3984-1.8906-6.4219v-10.141h-3.7969v-5.4688h3.7969v-6.7969z" />
        </symbol>
        <symbol id="g" overflow="visible">
          <path
            d="m19.953-20.422v-12.812h7.6875v33.234h-7.6875v-3.4531c-1.0547 1.4062-2.2148 2.4375-3.4844 3.0938-1.2734 0.65625-2.7422 0.98438-4.4062 0.98438-2.9492 0-5.3711-1.1719-7.2656-3.5156-1.8867-2.3438-2.8281-5.3594-2.8281-9.0469s0.94141-6.7031 2.8281-9.0469c1.8945-2.3438 4.3164-3.5156 7.2656-3.5156 1.6562 0 3.1172 0.33594 4.3906 1 1.2812 0.65625 2.4453 1.6836 3.5 3.0781zm-5.0469 15.484c1.6445 0 2.8945-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.85547-1.1953-2.1055-1.7969-3.75-1.7969-1.625 0-2.8711 0.60156-3.7344 1.7969-0.85547 1.1992-1.2812 2.9375-1.2812 5.2188 0 2.2734 0.42578 4.0078 1.2812 5.2031 0.86328 1.1992 2.1094 1.7969 3.7344 1.7969z" />
        </symbol>
        <symbol id="f" overflow="visible">
          <path
            d="m16.406-4.9375c1.6328 0 2.8828-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.86719-1.1953-2.1172-1.7969-3.75-1.7969-1.6367 0-2.8906 0.60547-3.7656 1.8125-0.875 1.1992-1.3125 2.9336-1.3125 5.2031 0 2.2617 0.4375 3.9961 1.3125 5.2031 0.875 1.1992 2.1289 1.7969 3.7656 1.7969zm-5.0781-15.484c1.0508-1.3945 2.2188-2.4219 3.5-3.0781 1.2812-0.66406 2.7539-1 4.4219-1 2.9453 0 5.3672 1.1719 7.2656 3.5156 1.8945 2.3438 2.8438 5.3594 2.8438 9.0469s-0.94922 6.7031-2.8438 9.0469c-1.8984 2.3438-4.3203 3.5156-7.2656 3.5156-1.668 0-3.1406-0.33594-4.4219-1s-2.4492-1.6914-3.5-3.0781v3.4531h-7.6562v-33.234h7.6562z" />
        </symbol>
        <symbol id="e" overflow="visible">
          <path
            d="m0.53125-23.922h7.6562l6.4219 16.234 5.4688-16.234h7.6562l-10.062 26.188c-1.0117 2.6641-2.1953 4.5234-3.5469 5.5781-1.3438 1.0625-3.1211 1.5938-5.3281 1.5938h-4.4219v-5.0156h2.3906c1.3008 0 2.2422-0.21094 2.8281-0.625 0.59375-0.40625 1.0547-1.1484 1.3906-2.2188l0.20312-0.65625z" />
        </symbol>
        <symbol id="a" overflow="visible">
          <path d="m4.0156-31.891h8.2188v25.672h14.453v6.2188h-22.672z" />
        </symbol>
        <symbol id="o" overflow="visible">
          <path
            d="m4.0156-31.891h8.2188v19.109c0 2.6367 0.42969 4.5234 1.2969 5.6562 0.86328 1.1367 2.2695 1.7031 4.2188 1.7031 1.9688 0 3.3789-0.56641 4.2344-1.7031 0.86328-1.1328 1.2969-3.0195 1.2969-5.6562v-19.109h8.2344v19.109c0 4.5234-1.1367 7.8867-3.4062 10.094-2.2617 2.2109-5.7148 3.3125-10.359 3.3125-4.625 0-8.0742-1.1016-10.344-3.3125-2.2617-2.207-3.3906-5.5703-3.3906-10.094z" />
        </symbol>
        <symbol id="n" overflow="visible">
          <path
            d="m0.21875-31.891h29.391v6.2188h-10.578v25.672h-8.2188v-25.672h-10.594z" />
        </symbol>
        <symbol id="m" overflow="visible">
          <path
            d="m4.0156-31.891h22.203v6.2188h-13.984v5.9375h13.141v6.2188h-13.141v13.516h-8.2188z" />
        </symbol>
        <symbol id="d" overflow="visible">
          <path d="m4.0156-31.891h8.2188v31.891h-8.2188z" />
        </symbol>
        <symbol id="l" overflow="visible">
          <path
            d="m32.688-2.375c-2.0547 1-4.1836 1.75-6.3906 2.25-2.2109 0.5-4.4844 0.75-6.8281 0.75-5.3125 0-9.5273-1.4844-12.641-4.4531-3.1055-2.9688-4.6562-7-4.6562-12.094 0-5.1328 1.5781-9.1758 4.7344-12.125 3.1641-2.9453 7.5-4.4219 13-4.4219 2.125 0 4.1562 0.19922 6.0938 0.59375 1.9453 0.39844 3.7852 0.99219 5.5156 1.7812v6.5938c-1.7812-1.0078-3.5547-1.7656-5.3125-2.2656-1.7617-0.5-3.5273-0.75-5.2969-0.75-3.2734 0-5.793 0.91797-7.5625 2.75-1.7734 1.8359-2.6562 4.4492-2.6562 7.8438 0 3.375 0.85156 5.9844 2.5625 7.8281 1.707 1.8359 4.1328 2.75 7.2812 2.75 0.85156 0 1.6445-0.050781 2.375-0.15625 0.73828-0.10156 1.3984-0.26953 1.9844-0.5v-6.2031h-5.0312v-5.5h12.828z" />
        </symbol>
        <symbol id="c" overflow="visible">
          <path
            d="m23.375-5.8125h-12.859l-2.0312 5.8125h-8.2656l11.812-31.891h9.7969l11.812 31.891h-8.2656zm-10.812-5.9219h8.7344l-4.3594-12.688z" />
        </symbol>
        <symbol id="k" overflow="visible">
          <path
            d="m4.0156-31.891h9.1875l11.594 21.875v-21.875h7.7969v31.891h-9.1875l-11.594-21.875v21.875h-7.7969z" />
        </symbol>
      </defs>
      <g>
        <path
          d="m560 43.75h-420c-28.949 0-52.5 23.551-52.5 52.5v280c0 28.949 23.551 52.5 52.5 52.5h148.75v35h-8.75c-34.566 0.88672-34.648 51.59 0 52.5h140c7.0938 0 13.699-2.7734 18.449-7.6484 16.703-15.699 4.5078-45.34-18.449-44.852h-8.75v-35h148.75c28.949 0 52.5-23.551 52.5-52.5v-280c0-28.949-23.551-52.5-52.5-52.5zm-315 367.5h-105c-19.297 0-35-15.703-35-35v-245h140zm175 70c11.441 0.18359 11.531 17.242 0 17.5h-140c-11.453-0.19141-11.535-17.293 0-17.5h15.578c4.8086 5.332 11.695 8.75 19.422 8.75h70c7.7266 0 14.613-3.418 19.422-8.75zm-113.75-17.5v-35h87.5v35c0 4.8242-3.9258 8.75-8.75 8.75h-70c-4.8242 0-8.75-3.9258-8.75-8.75zm288.75-87.5c0 19.297-15.703 35-35 35h-297.5v-280h306.25c4.832 0 8.75-3.918 8.75-8.75s-3.918-8.75-8.75-8.75h-463.75v-17.5c0-19.297 15.703-35 35-35h420c19.297 0 35 15.703 35 35z" />
        <path
          d="m175 78.75c-11.496 0.21875-11.492 17.281 0 17.5 11.492-0.22266 11.492-17.281 0-17.5z" />
        <path
          d="m140 78.75c-11.496 0.21875-11.492 17.281 0 17.5 11.492-0.22266 11.492-17.281 0-17.5z" />
        <path
          d="m210 78.75c-11.496 0.21875-11.492 17.281 0 17.5 11.492-0.22266 11.492-17.281 0-17.5z" />
        <path
          d="m183.75 376.25c-11.496 0.21875-11.492 17.281 0 17.5 11.492-0.22266 11.492-17.281 0-17.5z" />
        <path
          d="m218.75 376.25c-11.496 0.21875-11.492 17.281 0 17.5 11.492-0.22266 11.492-17.281 0-17.5z" />
        <path
          d="m131.25 166.25h87.5c11.477-0.1875 11.523-17.305 0-17.5h-87.5c-11.473 0.1875-11.52 17.305 0 17.5z" />
        <path
          d="m131.25 201.25h87.5c11.477-0.1875 11.523-17.305 0-17.5h-87.5c-11.473 0.1875-11.52 17.305 0 17.5z" />
        <path
          d="m131.25 236.25h87.5c11.477-0.1875 11.523-17.305 0-17.5h-87.5c-11.473 0.1875-11.52 17.305 0 17.5z" />
        <path
          d="m131.25 271.25h52.5c11.484-0.19141 11.512-17.305 0-17.5h-52.5c-11.484 0.19141-11.512 17.305 0 17.5z" />
        <path
          d="m542.5 148.75h-227.5c-19.297 0-35 15.703-35 35v78.75c0 19.297 15.703 35 35 35h227.5c19.297 0 35-15.703 35-35v-78.75c0-19.297-15.703-35-35-35zm17.5 113.75c0 9.6523-7.8477 17.5-17.5 17.5h-227.5c-9.6523 0-17.5-7.8477-17.5-17.5v-78.75c0-9.6523 7.8477-17.5 17.5-17.5h227.5c9.6523 0 17.5 7.8477 17.5 17.5z" />
        <path
          d="m512.11 187.14-56.914 39.066-41.137-26.645c-2.9609-1.9258-6.7852-1.8711-9.6953 0.12109l-72.707 49.691c-9.4141 6.5 0.42188 20.871 9.8789 14.449l67.902-46.406 41.145 26.648c2.9648 1.918 6.793 1.8672 9.707-0.13281l61.723-42.371c9.3906-6.4961-0.42969-20.875-9.9023-14.426z" />
        <path
          d="m306.25 341.25c-4.832 0-8.75 3.918-8.75 8.75v35c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-35c0-4.832-3.918-8.75-8.75-8.75z" />
        <path
          d="m341.25 315c-4.832 0-8.75 3.918-8.75 8.75v61.25c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-61.25c0-4.832-3.918-8.75-8.75-8.75z" />
        <path
          d="m376.25 350c-4.832 0-8.75 3.918-8.75 8.75v26.25c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-26.25c0-4.832-3.918-8.75-8.75-8.75z" />
        <path
          d="m411.25 341.25c-4.832 0-8.75 3.918-8.75 8.75v35c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-35c0-4.832-3.918-8.75-8.75-8.75z" />
        <path
          d="m446.25 315c-4.832 0-8.75 3.918-8.75 8.75v61.25c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-61.25c0-4.832-3.918-8.75-8.75-8.75z" />
        <path
          d="m481.25 350c-4.832 0-8.75 3.918-8.75 8.75v26.25c0 4.832 3.918 8.75 8.75 8.75s8.75-3.918 8.75-8.75v-26.25c0-4.832-3.918-8.75-8.75-8.75z" />
        <path
          d="m568.75 341.25h-35c-11.492 0.19141-11.508 17.305 0 17.5h35c11.492-0.19141 11.508-17.305 0-17.5z" />
        <path
          d="m568.75 376.25h-35c-11.492 0.19141-11.508 17.305 0 17.5h35c11.492-0.19141 11.508-17.305 0-17.5z" />
        <!-- <use x="70" y="691.25" xlink:href="#p"/>
        <use x="102.109375" y="691.25" xlink:href="#j"/>
        <use x="123.683594" y="691.25" xlink:href="#b"/>
        <use x="153.355469" y="691.25" xlink:href="#i"/>
        <use x="182.878906" y="691.25" xlink:href="#h"/>
        <use x="203.792969" y="691.25" xlink:href="#b"/>
        <use x="233.464844" y="691.25" xlink:href="#g"/>
        <use x="280.011719" y="691.25" xlink:href="#f"/>
        <use x="311.328125" y="691.25" xlink:href="#e"/>
        <use x="355.078125" y="691.25" xlink:href="#a"/>
        <use x="382.957031" y="691.25" xlink:href="#o"/>
        <use x="418.484375" y="691.25" xlink:href="#n"/>
        <use x="448.328125" y="691.25" xlink:href="#m"/>
        <use x="478.210937" y="691.25" xlink:href="#d"/>
        <use x="509.722656" y="691.25" xlink:href="#l"/>
        <use x="545.632812" y="691.25" xlink:href="#c"/>
        <use x="579.492188" y="691.25" xlink:href="#k"/>
        <use x="616.105469" y="691.25" xlink:href="#d"/>
        <use x="647.617188" y="691.25" xlink:href="#c"/>
        <use x="681.476562" y="691.25" xlink:href="#a"/> -->
      </g>
    </svg>
    <!-- dashboard by LUTFI GANI AL ACHMAD from <a href="https://thenounproject.com/browse/icons/term/dashboard/" target="_blank" title="dashboard Icons">Noun Project</a> --> `,
  styles: []
})
export class DashboardGraphicComponent {
  classes$ = new BehaviorSubject<string>('');
  constructor(@Attribute('class') public classes: string) {
    this.classes$.next(classes);
  }
}
