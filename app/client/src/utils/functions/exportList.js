import {downloadCSV} from 'react-admin';
import jsonExport from 'jsonexport/dist';
import format from "date-fns/format";

export const exporterCustomer = (posts) => {
  const postsForExport = posts.map(props => {
    const {id, first_name, last_name, address, email, phone, created_at, updated_at} = props;
    return {
      id, first_name, last_name, address, email, phone,
      created_at: format(new Date(created_at), 'yyyy-MM-dd HH:mm:ss'),
      updated_at: format(new Date(updated_at), 'yyyy-MM-dd HH:mm:ss'),
    };
  });
  jsonExport(postsForExport, {
    headers: ['id', 'first_name', 'last_name', 'address', 'email', 'phone', 'created_at', 'updated_at']
  }, (err, csv) => {
    downloadCSV(csv, 'posts');
  });
};

export const exporterLoan = (records, fetchRelatedRecords) => {
  fetchRelatedRecords(records, 'customer_id', 'customers')
    .then(customer => {
      const postsForExport = records.map((props) => {
        const {
          id,
          loan_amount,
          payment_amount,
          payment_period,
          return_total,
          profit,
          status,
          start_payment_date,
          end_payment_date,
          customer_id,
          created_at,
          updated_at
        } = props;

        return {
          id,
          first_name: customer[customer_id].first_name,
          last_name: customer[customer_id].last_name,
          email: customer[customer_id].email,
          phone: customer[customer_id].phone,
          customer_id,
          loan_amount,
          payment_amount,
          payment_period,
          return_total,
          profit,
          status,
          start_payment_date: format(new Date(start_payment_date), 'yyyy-MM-dd HH:mm:ss'),
          end_payment_date: format(new Date(end_payment_date), 'yyyy-MM-dd'),
          created_at: format(new Date(created_at), 'yyyy-MM-dd HH:mm:ss'),
          updated_at: format(new Date(updated_at), 'yyyy-MM-dd HH:mm:ss'),
        };
      });

      jsonExport(postsForExport, {
        headers: [
          'id',
          'first_name',
          'last_name',
          'email',
          'phone',
          'loan_amount',
          'payment_amount',
          'payment_period',
          'return_total',
          'profit',
          'status',
          'start_payment_date',
          'next_payment_date',
          'end_payment_date',
          'customer_id',
          'created_at',
          'updated_at'
        ]
      }, (err, csv) => {
        downloadCSV(csv, 'posts');
      });
    }).catch(e => {
    console.log(e)
  });
};