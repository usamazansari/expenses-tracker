import { Component } from '@angular/core';

@Component({
  selector: 'expenses-tracker-auth-graphic',
  standalone: true,
  template: `<svg
      version="1.1"
      viewBox="0 0 700 575"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="m" overflow="visible">
          <path
            d="m29.312-1.75c-1.5117 0.78125-3.0898 1.3711-4.7344 1.7656-1.6367 0.40625-3.3398 0.60938-5.1094 0.60938-5.3125 0-9.5273-1.4844-12.641-4.4531-3.1055-2.9688-4.6562-7-4.6562-12.094s1.5508-9.125 4.6562-12.094c3.1133-2.9688 7.3281-4.4531 12.641-4.4531 1.7695 0 3.4727 0.19922 5.1094 0.59375 1.6445 0.39844 3.2227 0.99219 4.7344 1.7812v6.5938c-1.5312-1.0391-3.0391-1.8008-4.5156-2.2812-1.4805-0.48828-3.0391-0.73438-4.6719-0.73438-2.9375 0-5.2461 0.94531-6.9219 2.8281-1.6797 1.875-2.5156 4.4648-2.5156 7.7656 0 3.293 0.83594 5.8828 2.5156 7.7656 1.6758 1.875 3.9844 2.8125 6.9219 2.8125 1.6328 0 3.1914-0.23828 4.6719-0.71875 1.4766-0.48828 2.9844-1.2539 4.5156-2.2969z" />
        </symbol>
        <symbol id="h" overflow="visible">
          <path
            d="m21.453-17.406c-0.67969-0.3125-1.3516-0.53906-2.0156-0.6875-0.65625-0.15625-1.3203-0.23438-1.9844-0.23438-1.9688 0-3.4844 0.63281-4.5469 1.8906-1.0547 1.2617-1.5781 3.0703-1.5781 5.4219v11.016h-7.6562v-23.922h7.6562v3.9219c0.97656-1.5625 2.1016-2.7031 3.375-3.4219 1.2812-0.71875 2.8125-1.0781 4.5938-1.0781 0.25 0 0.52344 0.011719 0.82812 0.03125 0.30078 0.023438 0.73438 0.070312 1.2969 0.14062z" />
        </symbol>
        <symbol id="c" overflow="visible">
          <path
            d="m27.562-12.031v2.1875h-17.891c0.1875 1.793 0.83203 3.1367 1.9375 4.0312 1.1133 0.89844 2.6719 1.3438 4.6719 1.3438 1.6016 0 3.25-0.23438 4.9375-0.70312 1.6875-0.47656 3.4219-1.2031 5.2031-2.1719v5.8906c-1.8047 0.6875-3.6094 1.2031-5.4219 1.5469-1.8125 0.35156-3.6211 0.53125-5.4219 0.53125-4.3359 0-7.7031-1.0977-10.109-3.2969-2.3984-2.207-3.5938-5.2969-3.5938-9.2656 0-3.9062 1.1758-6.9727 3.5312-9.2031 2.3633-2.2383 5.6094-3.3594 9.7344-3.3594 3.7578 0 6.7695 1.1367 9.0312 3.4062 2.2578 2.2617 3.3906 5.2812 3.3906 9.0625zm-7.8594-2.5312c0-1.457-0.42969-2.6289-1.2812-3.5156-0.84375-0.89453-1.9492-1.3438-3.3125-1.3438-1.4922 0-2.6992 0.41797-3.625 1.25-0.91797 0.83594-1.4922 2.0391-1.7188 3.6094z" />
        </symbol>
        <symbol id="b" overflow="visible">
          <path
            d="m14.391-10.766c-1.5938 0-2.793 0.27344-3.5938 0.8125-0.80469 0.54297-1.2031 1.3398-1.2031 2.3906 0 0.96875 0.32031 1.7305 0.96875 2.2812 0.64453 0.54297 1.5469 0.8125 2.7031 0.8125 1.4375 0 2.6445-0.51562 3.625-1.5469 0.98828-1.0312 1.4844-2.3203 1.4844-3.875v-0.875zm11.688-2.8906v13.656h-7.7031v-3.5469c-1.0312 1.4492-2.1875 2.5078-3.4688 3.1719s-2.8398 1-4.6719 1c-2.4805 0-4.4961-0.72266-6.0469-2.1719-1.543-1.4453-2.3125-3.3203-2.3125-5.625 0-2.8125 0.96094-4.8672 2.8906-6.1719 1.9375-1.3125 4.9688-1.9688 9.0938-1.9688h4.5156v-0.60938c0-1.207-0.48047-2.0938-1.4375-2.6562-0.94922-0.5625-2.4375-0.84375-4.4688-0.84375-1.6367 0-3.1562 0.16797-4.5625 0.5-1.4062 0.32422-2.7188 0.8125-3.9375 1.4688v-5.8281c1.6445-0.40625 3.2891-0.70703 4.9375-0.90625 1.6562-0.20703 3.3047-0.3125 4.9531-0.3125 4.3203 0 7.4375 0.85547 9.3438 2.5625 1.9141 1.6992 2.875 4.4609 2.875 8.2812z" />
        </symbol>
        <symbol id="g" overflow="visible">
          <path
            d="m12.031-30.719v6.7969h7.875v5.4688h-7.875v10.141c0 1.1172 0.21875 1.8711 0.65625 2.2656 0.4375 0.38672 1.3125 0.57812 2.625 0.57812h3.9375v5.4688h-6.5625c-3.0234 0-5.1641-0.62891-6.4219-1.8906-1.2617-1.2578-1.8906-3.3984-1.8906-6.4219v-10.141h-3.7969v-5.4688h3.7969v-6.7969z" />
        </symbol>
        <symbol id="f" overflow="visible">
          <path
            d="m19.953-20.422v-12.812h7.6875v33.234h-7.6875v-3.4531c-1.0547 1.4062-2.2148 2.4375-3.4844 3.0938-1.2734 0.65625-2.7422 0.98438-4.4062 0.98438-2.9492 0-5.3711-1.1719-7.2656-3.5156-1.8867-2.3438-2.8281-5.3594-2.8281-9.0469s0.94141-6.7031 2.8281-9.0469c1.8945-2.3438 4.3164-3.5156 7.2656-3.5156 1.6562 0 3.1172 0.33594 4.3906 1 1.2812 0.65625 2.4453 1.6836 3.5 3.0781zm-5.0469 15.484c1.6445 0 2.8945-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.85547-1.1953-2.1055-1.7969-3.75-1.7969-1.625 0-2.8711 0.60156-3.7344 1.7969-0.85547 1.1992-1.2812 2.9375-1.2812 5.2188 0 2.2734 0.42578 4.0078 1.2812 5.2031 0.86328 1.1992 2.1094 1.7969 3.7344 1.7969z" />
        </symbol>
        <symbol id="e" overflow="visible">
          <path
            d="m16.406-4.9375c1.6328 0 2.8828-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.86719-1.1953-2.1172-1.7969-3.75-1.7969-1.6367 0-2.8906 0.60547-3.7656 1.8125-0.875 1.1992-1.3125 2.9336-1.3125 5.2031 0 2.2617 0.4375 3.9961 1.3125 5.2031 0.875 1.1992 2.1289 1.7969 3.7656 1.7969zm-5.0781-15.484c1.0508-1.3945 2.2188-2.4219 3.5-3.0781 1.2812-0.66406 2.7539-1 4.4219-1 2.9453 0 5.3672 1.1719 7.2656 3.5156 1.8945 2.3438 2.8438 5.3594 2.8438 9.0469s-0.94922 6.7031-2.8438 9.0469c-1.8984 2.3438-4.3203 3.5156-7.2656 3.5156-1.668 0-3.1406-0.33594-4.4219-1s-2.4492-1.6914-3.5-3.0781v3.4531h-7.6562v-33.234h7.6562z" />
        </symbol>
        <symbol id="a" overflow="visible">
          <path
            d="m0.53125-23.922h7.6562l6.4219 16.234 5.4688-16.234h7.6562l-10.062 26.188c-1.0117 2.6641-2.1953 4.5234-3.5469 5.5781-1.3438 1.0625-3.1211 1.5938-5.3281 1.5938h-4.4219v-5.0156h2.3906c1.3008 0 2.2422-0.21094 2.8281-0.625 0.59375-0.40625 1.0547-1.1484 1.3906-2.2188l0.20312-0.65625z" />
        </symbol>
        <symbol id="d" overflow="visible">
          <path
            d="m4.0156-31.891h22.203v6.2188h-13.984v5.9375h13.141v6.2188h-13.141v7.2969h14.453v6.2188h-22.672z" />
        </symbol>
        <symbol id="l" overflow="visible">
          <path
            d="m3.4219-9.3125v-14.609h7.6875v2.3906c0 1.293-0.011719 2.918-0.03125 4.875-0.011719 1.9609-0.015625 3.2656-0.015625 3.9219 0 1.9297 0.046875 3.3125 0.14062 4.1562 0.10156 0.84375 0.28125 1.4609 0.53125 1.8438 0.3125 0.5 0.71875 0.88672 1.2188 1.1562 0.50781 0.27344 1.0938 0.40625 1.75 0.40625 1.5938 0 2.8438-0.60938 3.75-1.8281 0.91406-1.2266 1.375-2.9297 1.375-5.1094v-11.812h7.6406v23.922h-7.6406v-3.4531c-1.1562 1.3867-2.3828 2.4141-3.6719 3.0781-1.2812 0.66406-2.6992 1-4.25 1-2.7734 0-4.8828-0.84766-6.3281-2.5469-1.4375-1.6953-2.1562-4.1602-2.1562-7.3906z" />
        </symbol>
        <symbol id="k" overflow="visible">
          <path
            d="m23-23.172v6.2344c-1.0312-0.71875-2.0742-1.2422-3.125-1.5781-1.043-0.34375-2.125-0.51562-3.25-0.51562-2.1367 0-3.8047 0.625-5 1.875-1.1875 1.2422-1.7812 2.9805-1.7812 5.2188 0 2.2305 0.59375 3.9688 1.7812 5.2188 1.1953 1.25 2.8633 1.875 5 1.875 1.1953 0 2.332-0.17578 3.4062-0.53125 1.0703-0.36328 2.0625-0.89453 2.9688-1.5938v6.2656c-1.1875 0.4375-2.4023 0.76562-3.6406 0.98438-1.2305 0.22656-2.4648 0.34375-3.7031 0.34375-4.3125 0-7.6875-1.1094-10.125-3.3281s-3.6562-5.2969-3.6562-9.2344c0-3.9453 1.2188-7.0234 3.6562-9.2344 2.4375-2.2188 5.8125-3.3281 10.125-3.3281 1.25 0 2.4844 0.10938 3.7031 0.32812s2.4297 0.55469 3.6406 1z" />
        </symbol>
        <symbol id="j" overflow="visible">
          <path d="m3.6719-33.234h7.6562v33.234h-7.6562z" />
        </symbol>
        <symbol id="i" overflow="visible">
          <path
            d="m11.328-3.4531v12.547h-7.6562v-33.016h7.6562v3.5c1.0508-1.3945 2.2188-2.4219 3.5-3.0781 1.2812-0.66406 2.7539-1 4.4219-1 2.9453 0 5.3672 1.1719 7.2656 3.5156 1.8945 2.3438 2.8438 5.3594 2.8438 9.0469s-0.94922 6.7031-2.8438 9.0469c-1.8984 2.3438-4.3203 3.5156-7.2656 3.5156-1.668 0-3.1406-0.33594-4.4219-1s-2.4492-1.6914-3.5-3.0781zm5.0781-15.5c-1.6367 0-2.8906 0.60547-3.7656 1.8125-0.875 1.1992-1.3125 2.9336-1.3125 5.2031 0 2.2617 0.4375 3.9961 1.3125 5.2031 0.875 1.1992 2.1289 1.7969 3.7656 1.7969 1.6328 0 2.8828-0.59766 3.75-1.7969 0.86328-1.1953 1.2969-2.9297 1.2969-5.2031 0-2.2812-0.43359-4.0195-1.2969-5.2188-0.86719-1.1953-2.1172-1.7969-3.75-1.7969z" />
        </symbol>
      </defs>
      <g>
        <path
          d="m551.25 411.25c-15.883 0-30.504 5.3828-42.262 14.332-26.129-35.105-64.582-58.793-107.86-65.852l-2.2031-11.035c36.789-6.6055 64.824-38.777 64.824-77.445v-8.75h88.742c3.9102 15.059 17.5 26.25 33.758 26.25 19.301 0 35-15.699 35-35s-15.699-35-35-35c-16.258 0-29.848 11.191-33.758 26.25h-62.719c5.5547-7.332 8.9766-16.363 8.9766-26.25 0-8.4336-2.5117-16.25-6.668-22.934 4.3477-12.977 6.668-26.453 6.668-40.164v-20.258c0-69.832-56.812-126.64-126.65-126.64h-24.656c-38.57 0-73.344 20.914-91.438 54.758-33.855 18.094-54.758 52.867-54.758 91.438v12.977c0 10.621 1.707 21.07 4.8906 31.148-3.0273 5.9492-4.8906 12.574-4.8906 19.68 0 9.8867 3.4219 18.918 8.9766 26.25h-62.719c-3.9102-15.059-17.5-26.25-33.758-26.25-19.301 0-35 15.699-35 35s15.699 35 35 35c16.258 0 29.848-11.191 33.758-26.25h88.742v8.75c0 38.668 28.035 70.848 64.836 77.445l-2.2148 11.035c-43.25 7.0508-81.727 30.746-107.86 65.859-11.758-8.957-26.371-14.34-42.262-14.34-38.598 0-70 31.402-70 70s31.402 70 70 70h402.5c38.598 0 70-31.402 70-70s-31.402-70-70-70zm35-175c9.6523 0 17.5 7.8477 17.5 17.5s-7.8477 17.5-17.5 17.5-17.5-7.8477-17.5-17.5 7.8477-17.5 17.5-17.5zm-472.5 35c-9.6523 0-17.5-7.8477-17.5-17.5s7.8477-17.5 17.5-17.5 17.5 7.8477 17.5 17.5-7.8477 17.5-17.5 17.5zm287.14 106.42-5.7148 68.59-32.855-27.379 34.902-41.879c1.2344 0.19531 2.4492 0.44922 3.668 0.66797zm-50.891 28.664-34.344-41.223 3.0195-15.109h62.66l3.0273 15.102zm96.25-161.33h-192.5v-61.25c0-24.125 19.625-43.75 43.742-43.75l50.434-0.007812c22.77 16.801 50.699 26.258 80.336 26.258 9.9219 0 17.988 8.0664 17.988 17.988zm17.5-1.6094v-49.27c10.16 3.6211 17.5 13.246 17.5 24.641 0 11.391-7.3398 21.004-17.5 24.629zm-227.5 0c-10.16-3.6211-17.5-13.246-17.5-24.641 0-11.391 7.3398-21.016 17.5-24.641zm0.57031-67.566c-6.1406 1.1719-11.812 3.6133-16.758 7.0625-0.86719-4.9258-1.3125-9.9219-1.3125-14.961v-12.977c0-32.863 18.262-62.422 47.66-77.113l2.6094-1.3047 1.3047-2.6094c14.699-29.41 44.254-47.672 77.121-47.672h24.656c60.184 0 109.15 48.965 109.15 109.15v20.258c0 8.8359-1.1445 17.543-3.2461 26.047-4.6367-2.8867-9.8086-4.9453-15.383-5.9336-3.8242-15.469-17.719-27.02-34.359-27.02-44.941 0-85.34-24.973-105.44-65.16l-15.652 7.832c5.75 11.496 12.949 21.926 21.324 31.078h-31.004c-31.082 0-56.762 23.293-60.672 53.324zm16.93 95.426v-8.75h192.5v8.75c0 33.766-27.477 61.25-61.25 61.25h-70c-33.773 0-61.25-27.484-61.25-61.25zm49.027 105.75 34.895 41.879-32.855 27.379-5.7148-68.59c1.2266-0.22266 2.4414-0.47656 3.6758-0.66797zm-154.03 156.75c-28.953 0-52.5-23.547-52.5-52.5s23.547-52.5 52.5-52.5 52.5 23.547 52.5 52.5-23.547 52.5-52.5 52.5zm315 0v-70h-17.5v70h-192.5v-70h-17.5v70h-41.352c14.586-12.836 23.852-31.586 23.852-52.5 0-16.355-5.6797-31.379-15.109-43.312 19.426-26.949 46.883-46.508 78.262-56.105l8.2852 99.41 59.812-49.859 59.824 49.859 8.2852-99.41c31.387 9.5977 58.836 29.156 78.25 56.113-9.4297 11.926-15.109 26.949-15.109 43.305 0 20.914 9.2656 39.664 23.852 52.5zm87.5 0c-28.953 0-52.5-23.547-52.5-52.5s23.547-52.5 52.5-52.5 52.5 23.547 52.5 52.5-23.547 52.5-52.5 52.5z" />
        <path
          d="m168.81 448.81-20.062 20.066-20.062-20.066-12.375 12.375 20.066 20.062-20.066 20.062 12.375 12.375 20.062-20.066 20.062 20.066 12.375-12.375-20.066-20.062 20.066-20.062z" />
        <path
          d="m542.5 495.13-11.312-11.316-12.375 12.375 23.688 23.684 49.938-49.934-12.375-12.375z" />
        <path d="m577.5 183.75h17.5v-70h-70v17.5h52.5z" />
        <path d="m577.5 376.25h-52.5v17.5h70v-70h-17.5z" />
        <path d="m105 323.75v70h70v-17.5h-52.5v-52.5z" />
        <path d="m122.5 131.25h52.5v-17.5h-70v70h17.5z" />
        <!-- <use x="70" y="691.25" xlink:href="#m" />
        <use x="102.109375" y="691.25" xlink:href="#h" />
        <use x="123.683594" y="691.25" xlink:href="#c" />
        <use x="153.355469" y="691.25" xlink:href="#b" />
        <use x="182.878906" y="691.25" xlink:href="#g" />
        <use x="203.792969" y="691.25" xlink:href="#c" />
        <use x="233.464844" y="691.25" xlink:href="#f" />
        <use x="280.011719" y="691.25" xlink:href="#e" />
        <use x="311.328125" y="691.25" xlink:href="#a" />
        <use x="355.078125" y="691.25" xlink:href="#d" />
        <use x="384.964844" y="691.25" xlink:href="#l" />
        <use x="416.113281" y="691.25" xlink:href="#k" />
        <use x="442.046875" y="691.25" xlink:href="#b" />
        <use x="471.570312" y="691.25" xlink:href="#j" />
        <use x="486.566406" y="691.25" xlink:href="#a" />
        <use x="515.082031" y="691.25" xlink:href="#i" /> -->
      </g>
    </svg>
    <!-- False by Eucalyp from <a href="https://thenounproject.com/browse/icons/term/false/" target="_blank" title="False Icons">Noun Project</a> --> `
})
export class AuthGraphicComponent {}
