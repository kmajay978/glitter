import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {PermissionsAndroid,Platform} from "react-native";
import NavigationService from '../router/NavigationService';
import store from '../redux/store';
import types from '../redux/types';
export async function getHeaders() {
	let userData = await AsyncStorage.getItem('userData');
	if (userData) {
		userData = JSON.parse(userData);

		return {
			authorization: `Bearer ${userData.token}`,
		};
	}
	return {};
}

export function setUserData(data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('userData', data);
}

export function setItem(key, data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(key).then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export function removeItem(key) {
	return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
	return AsyncStorage.clear();
}

export async function getUserData() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('userData').then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export async function clearUserData() {
	return AsyncStorage.removeItem('userData');
}

export async function apiReq(endPoint, data, method, headers, requestOptions = {}) {
	return new Promise(async (res, rej) => {
		// const getTokenHeader = await getHeaders();
		// headers = {
		// 	...getTokenHeader,
		// 	...headers
		// };
	
		if(data instanceof FormData) {
            headers = {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        }else{
            // const getTokenHeader = await getHeaders();
            // headers = {
            //  ...getTokenHeader,
            //  ...headers
            // };
            headers= {
                Accept: "application/json",
                "Content-Type": "application/json",
                }
        }

		if (method === 'get' || method === 'delete') {
			data = {
				...requestOptions,
				...data,
				headers
			};
		}
		
		axios[method](endPoint, data, { headers })
			.then(result => {

				const { data } = result;

				if (data.status === false) {
					return rej(data);
				}

				return res(data);
			})
			.catch(error => {
				console.log(error)
				console.log(error&&error.response,'the error respne')
				if (error && error.response && error.response.status === 401) {
					clearUserData();
					// NavigationService.resetNavigation());
					NavigationService.navigate('auth');
					const { dispatch } = store;
					dispatch({
						type: types.CLEAR_REDUX_STATE,
						payload: {}
					});
				}
				


				if (error && error.response && error.response.status === 400) {
					return rej(error.response.data.error_description)
					//alert(error.response.data.error_description)
                }
                if (error&& error.response && error.response.data&& !!error.response.data.msg) {
					return rej(error.response.data)
				} else {
                    return rej({message:"Network Error",msg:"Network Error"});
				}
				return rej(error);
			});
	});
}

export function apiPost(endPoint, data, headers = {}) {

	return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
	
	return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'put', headers);
}

export function randomString(len = 5) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < len; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}


/* 
const getNextDates = (count) => {
	const datesArray = [];

	for (let day = 0; day < count; day++) {
		const nextDate = dayjs().add(day, 'd');

		const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
			'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
		];
		const days = ['اﻷحد', 'اﻷثنين', 'الثلاثاء', 'اﻷربعاء', 'الخميس', 'الجمعة', 'السبت'];

		const dateObj = {
			date: nextDate.get('date'),
			month: nextDate.get('month'),
			day: nextDate.get('day'),
			formatted_date: `${days[nextDate.get('day')]}, ${nextDate.get('date')} ${months[nextDate.get('month')]}, ${nextDate.get('year')}`
		};

		datesArray.push(dateObj);
	}
	return datesArray;
};
 */
function getWeekDays(locale) {
	const baseDate = new Date(Date.UTC(2019, 8, 30)); // just a Monday

	const weekDays = [];
	for (let i = 0; i < 7; i++) {
		weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
		baseDate.setDate(baseDate.getDate() + 1);
	}
	return weekDays;
}

// const weekDays = getWeekDays('ar');

// console.log('\n\n week days: ', weekDays);
export const androidCameraPermission = () => new Promise(async (resolve, reject) => {
	try {
		if (Platform.OS === 'android' && Platform.Version > 22) {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.CAMERA,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
			]);

			if (
				granted['android.permission.CAMERA'] !== 'granted' ||
				granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
				granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
			) {
				Alert.alert(
					strings.ALERT,
					strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE,
					[
						{ text: strings.OKAY },
					],
					{ cancelable: true }
				);
				return resolve(false);
				// alert(strings.DO_NOT_HAVE_PERMISSIONS_TO_SELECT_IMAGE);
			}
			return resolve(true);
		}

		return resolve(true);
	} catch (error) {
		return resolve(false);
	}
});


export const locationPermission = ()=>{
	if (Platform.OS === 'android' && Platform.Version > 22) {
		return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
	}

	return Promise.resolve("granted")
}