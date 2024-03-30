import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import ID from 'dayjs/locale/id';
dayjs.extend(relativeTime);
dayjs.extend(duration);

const formatter = {
    rupiah: (number: number) => (`Rp ${formatter.number(number)}`),
    number: (number: number) => (isNaN(number) ? new Intl.NumberFormat('id-ID').format(parseFloat(number as any)) : new Intl.NumberFormat('id-ID').format(number)),
    date: (date: string, format = 'DD/MM/YYYY') => {
        const formatted = dayjs(date).locale(ID).format(format);
        return formatted;
    },
    dateTime: (date: string, format = 'DD/MM/YYYY HH:mm:ss') => {
        const formatted = dayjs(date).locale(ID).format(format);
        return formatted;
    },
    dateJob: (date: string, format = 'DD MMM YYYY') => {
        const formatted = dayjs(date).format(format);
        return formatted;
    },
    timeFromNow: (date: string) => (dayjs(date).fromNow()),
    generateResultError(apiResponse: any) {
        const responseError = apiResponse?.result ?? apiResponse?.errors ?? [];
        if (typeof responseError === 'string') {
            return responseError;
        }

        if (responseError?.[0]) {
            const errors = responseError.map((val: any) => val?.ErrorMessage ? `${val?.ErrorMessage} \n` : '');
            return errors.length > 0 ? errors.join(',') : '';
        }

        let message = '';
        for (const key in responseError) {
            if (Object.prototype.hasOwnProperty.call(responseError, key)) {
                const errors = responseError[key];
                if (errors?.[0]) {
                    message += errors.map((val: any) => `${val} \n`)
                } else {
                    message += `${errors} \n`
                }
            }
        }

        return message;
    },
    getErrorMessage(response: any) {
        return response?.response?.data?.message;
    },
    formatEndDate(endDate: string, format: string = 'MMM YYYY') {
        return !endDate || endDate === '' ? 'Present' : formatter.date(endDate, format)
    },
    formatEllipsisText(text: string, characterLength: number = 15) {
        if (text.length > characterLength) return `${text.slice(0, characterLength - 3)}...`
        return text
    },
    formatSalary(isShowSalary: boolean, minSalary: number | string, maxSalary: number | string) {
        if (!isShowSalary) return 'Not displayed by company';

        return `${formatter.rupiah(typeof minSalary !== 'number' ? 0 : minSalary)} - ${formatter.rupiah(typeof maxSalary !== 'number' ? 0 : maxSalary)}`;
    },
    formatNonEmptyText(field: string, defaultValue = 'Not added yet') {
        return (field ?? '').length === 0 ? defaultValue : field;
    },
    formatLink(to: string) {
        if (!/^https?:\/\//i.test(to)) {
            to = `http://${to}`;
        }

        return to;
    },
    getBase64(file: any) {
        return new Promise(resolve => {
            let result;
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                resolve(reader.result);
            };
        });
    },
    formatDuration(seconds: number) {
        const durationObject = dayjs.duration(seconds, 'seconds');

        // If duration is more than 1 day
        if (durationObject.asDays() >= 1) {
            return `${Math.floor(durationObject.asDays())} days`;
        }

        // If duration is more than 1 hour
        if (durationObject.asHours() >= 1) {
            return `${Math.floor(durationObject.asHours())} hours`;
        }

        // If duration is more than 1 minute
        if (durationObject.asMinutes() >= 1) {
            return `${Math.floor(durationObject.asMinutes())} minutes`;
        }

        // Otherwise, it's less than 1 minute
        return `${durationObject.seconds()} seconds`;
    },
    formatStringForHTML(input: string): string {
        return input?.replace(/\n/g, '<br>');
    }
}

export default formatter;