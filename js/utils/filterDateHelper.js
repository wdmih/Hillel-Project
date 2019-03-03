import moment from 'moment';

export default function filterDateHelper(target) {
  switch (target.value) {
    case 'today':
      this.filterDates.startDate = moment().format('YYYY-MM-DDTh:mm');
      this.filterDates.endDate = null;
      break;
    case 'tomorrow':
      this.filterDates.startDate = moment().add(1, 'days').format('YYYY-MM-DDTh:mm');
      this.filterDates.endDate = null;
      break;
    case 'week':
      this.filterDates.startDate = moment().format('YYYY-MM-DDTh:mm');
      this.filterDates.endDate = moment().endOf('isoweek').format('YYYY-MM-DDTh:mm');
      break;
    case 'month':
      this.filterDates.startDate = moment().format('YYYY-MM-DDTh:mm');
      this.filterDates.endDate = moment().endOf('month').format('YYYY-MM-DDTh:mm');
      break;
    default:
      break;
  }
}
