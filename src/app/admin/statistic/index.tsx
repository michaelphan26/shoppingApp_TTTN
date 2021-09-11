import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BlueButton } from '../../../common/ui/base/button';
import BlueRoundedButton from '../../../common/ui/base/button/blueRoundedButton';
import PinkButton from '../../../common/ui/base/button/pinkButton';
import { NormalTextInput } from '../../../common/ui/base/textInput';
import CartLayout from '../../../common/ui/layout/cart-layout';
import { showToast } from '../../../common/util/common';
import { api_url } from '../../../common/util/constant';
import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import { Color } from '../../../common/util/enum';
import { Text as TextSVG } from 'react-native-svg';
import numeral from 'numeral';

interface Props {}
const AdminStatistic = (props: Props) => {
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [dateFromShow, setDateFromShow] = useState<boolean>(false);
  const [dateToShow, setDateToShow] = useState<boolean>(false);
  const [labelList, setLabelList] = useState([] as any);
  const [sumList, setSumList] = useState([] as any);

  function dateValidate() {
    const today = new Date();
    if (moment(dateFrom) > moment(dateTo)) {
      return false;
    } else if (
      moment(dateFrom) > moment(today) ||
      moment(dateTo) > moment(today)
    ) {
      return false;
    }
    return true;
  }

  const processDataToChart = (data: any[]) => {
    let labelList = [] as any;
    let sumList = [] as any;
    for (const index in data) {
      const indexOfLabel = labelList.findIndex(
        (date: string) =>
          new Date(data[index].date).toLocaleDateString() === date
      );

      if (indexOfLabel === -1) {
        labelList.push(new Date(data[index].date).toLocaleDateString());
        sumList.push(parseInt(data[index].total));
      } else {
        sumList[indexOfLabel] =
          parseInt(sumList[indexOfLabel]) + parseInt(data[index].total);
      }
    }

    setLabelList(labelList);
    setSumList(sumList);
    console.log(labelList);
  };

  const handleSubmitPressed = async () => {
    if (dateValidate()) {
      const token = await AsyncStorage.getItem('@token');
      await axios({
        url: 'admin/get-receipt-statistic',
        baseURL: `${api_url}`,
        method: 'post',
        headers: {
          'x-auth-token': token,
        },
        data: {
          dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
          dateTo: moment(dateTo).format('YYYY-MM-DD'),
        },
        responseType: 'json',
      })
        .then((res) => {
          if (res.data['code'] === 200) {
            processDataToChart(res.data['data']);
          } else {
            showToast('Không thể lấy thông tin hóa đơn');
          }
        })
        .catch((err) => showToast('Không thể lấy thông tin hóa đơn'));
    } else {
      showToast('Vui lòng kiểm tra lại ngày tháng');
    }
  };

  const handleResetPressed = () => {
    setSumList([]);
    setLabelList([]);
    setDateFrom(new Date());
    setDateTo(new Date());
  };

  const onDateFromChange = (date) => {
    const currentDate = date || dateFrom;
    setDateFrom(currentDate);
    setDateFromShow(false);
  };

  const onDateToChange = (date) => {
    const currentDate = date || dateTo;
    setDateTo(currentDate);
    setDateToShow(false);
  };

  const handlePickDateFrom = () => {
    setDateFromShow(true);
  };
  const handlePickDateTo = () => {
    setDateToShow(true);
  };

  const onDateFromHide = () => {
    setDateFromShow(false);
  };

  const onDateToHide = () => {
    setDateToShow(false);
  };

  const chartReturn = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          borderRadius: 16,
        }}
      >
        <LineChart
          data={{
            labels: labelList,
            datasets: [
              {
                data: sumList,
              },
            ],
            legend: ['Doanh thu'],
          }}
          width={(Dimensions.get('window').width * 90) / 100}
          height={(Dimensions.get('window').height * 50) / 100}
          fromZero={true}
          yAxisSuffix=" đ"
          yAxisInterval={1}
          yLabelsOffset={10}
          chartConfig={{
            backgroundColor: Color.white,
            backgroundGradientFrom: Color.white,
            backgroundGradientTo: Color['light-gray'],
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => Color.black,
            labelColor: (opacity = 1) => Color.black,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: Color.black,
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
          renderDotContent={({ x, y, index }) => {
            return (
              <TextSVG
                key={index}
                x={x - 30}
                y={y - 15}
                fill="black"
                fontSize={
                  Platform.OS === 'android'
                    ? (Dimensions.get('window').height * 1.5) / 100
                    : (Dimensions.get('window').height * 1.1) / 100
                }
                fontWeight="bold"
              >
                {numeral(sumList[index]).format(0, 0)}đ
              </TextSVG>
            );
          }}
          formatYLabel={(value) => numeral(value).format('0,0a')}
          verticalLabelRotation={20}
        />
      </ScrollView>
    );
  };

  return (
    <CartLayout
      title="Doanh thu"
      backPressed={() => {
        Actions.pop();
        setTimeout(() => {
          Actions.refresh({ key: Math.random() });
        }, 10);
      }}
    >
      <View style={styles.pickerContainer}>
        <NormalTextInput
          placeholderText="Từ ngày..."
          editable={false}
          value={moment(dateFrom).format('DD/MM/YYYY')}
        />
        <BlueRoundedButton iconName="calendar" pressed={handlePickDateFrom} />
      </View>
      {dateFromShow && (
        <DateTimePickerModal
          isVisible={dateFromShow}
          mode="date"
          onConfirm={onDateFromChange}
          onCancel={onDateFromHide}
        />
      )}
      <View style={styles.pickerContainer}>
        <NormalTextInput
          placeholderText="Đến ngày..."
          editable={false}
          value={moment(dateTo).format('DD/MM/YYYY')}
        />
        <BlueRoundedButton iconName="calendar" pressed={handlePickDateTo} />
      </View>
      {dateToShow && (
        <DateTimePickerModal
          isVisible={dateToShow}
          mode="date"
          onConfirm={onDateToChange}
          onCancel={onDateToHide}
        />
      )}
      <View style={styles.pickerContainer}>
        <BlueButton title="Thống kê" pressed={handleSubmitPressed} />
        <PinkButton title="Chọn lại" pressed={handleResetPressed} />
      </View>
      <View style={styles.chartContainer}>
        {sumList.length !== 0 && labelList !== 0 ? chartReturn() : null}
      </View>
    </CartLayout>
  );
};

export default AdminStatistic;
