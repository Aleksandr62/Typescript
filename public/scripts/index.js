import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
window.addEventListener('DOMContentLoaded', () => {
    renderUserBlock('Vasiliy', '../img/avatar.png', 0);
    renderSearchFormBlock();
    renderSearchStubBlock();
    renderToast({ text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' }, { name: 'Понял', handler: () => { console.log('Уведомление закрыто'); } });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDL0MsZUFBZSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNsRCxxQkFBcUIsRUFBRSxDQUFBO0lBQ3ZCLHFCQUFxQixFQUFFLENBQUE7SUFDdkIsV0FBVyxDQUNQLEVBQUMsSUFBSSxFQUFFLDJEQUEyRCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsRUFDcEYsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FDdkUsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU2VhcmNoRm9ybUJsb2NrIH0gZnJvbSAnLi9zZWFyY2gtZm9ybS5qcydcbmltcG9ydCB7IHJlbmRlclNlYXJjaFN0dWJCbG9jayB9IGZyb20gJy4vc2VhcmNoLXJlc3VsdHMuanMnXG5pbXBvcnQgeyByZW5kZXJVc2VyQmxvY2sgfSBmcm9tICcuL3VzZXIuanMnXG5pbXBvcnQgeyByZW5kZXJUb2FzdCB9IGZyb20gJy4vbGliLmpzJ1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgcmVuZGVyVXNlckJsb2NrKCdWYXNpbGl5JywgJy4uL2ltZy9hdmF0YXIucG5nJywgMClcbiAgcmVuZGVyU2VhcmNoRm9ybUJsb2NrKClcbiAgcmVuZGVyU2VhcmNoU3R1YkJsb2NrKClcbiAgcmVuZGVyVG9hc3QoXG4gICAgICB7dGV4dDogJ9Ct0YLQviDQv9GA0LjQvNC10YAg0YPQstC10LTQvtC80LvQtdC90LjRjy4g0JjRgdC/0L7Qu9GM0LfRg9C50YLQtSDQtdCz0L4g0L/RgNC4INC90LXQvtCx0YXQvtC00LjQvNC+0YHRgtC4JywgdHlwZTogJ3N1Y2Nlc3MnfSxcbiAgICAgIHtuYW1lOiAn0J/QvtC90Y/QuycsIGhhbmRsZXI6ICgpID0+IHtjb25zb2xlLmxvZygn0KPQstC10LTQvtC80LvQtdC90LjQtSDQt9Cw0LrRgNGL0YLQvicpfX1cbiAgKVxufSlcbiJdfQ==