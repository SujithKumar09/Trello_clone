import { DatePicker } from 'antd';
import type moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const MyDatePicker = DatePicker.generatePicker<moment.Moment>(momentGenerateConfig);

export default MyDatePicker;