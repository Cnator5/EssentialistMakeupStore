import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoData from '../components/NoData'
import { format } from 'date-fns'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  const dispatch = useDispatch()
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  const getStatusColor = (status) => {
    switch(status) {
      case 'CASH ON DELIVERY':
        return 'bg-orange-100 text-orange-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      // Dispatch delete action here
      console.log('Deleting order:', orderId)
    }
  }

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  console.log("order Items", orders)
  return (
    <div className="max-w-6xl mx-auto">
      <div className='bg-white shadow-md p-5 font-semibold mb-4 rounded-md flex items-center justify-between'>
        <h1 className="text-xl">My Orders</h1>
        <span className="text-sm text-gray-500">Showing {orders.length} orders</span>
      </div>

      {!orders[0] && <NoData/>}

      <div className="space-y-4">
        {orders.map((order, index) => {
          const isExpanded = expandedOrderId === order._id
          const orderDate = order.createdAt ? new Date(order.createdAt) : new Date()
          const formattedDate = format(orderDate, 'MMM dd, yyyy · h:mm a')
          
          return (
            <div key={order._id + index + "order"} className='bg-white rounded-lg shadow-md overflow-hidden'>
              {/* Order header */}
              <div className="bg-gray-50 p-4 border-b flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500 text-sm">Order ID:</span>
                    <span className="font-medium">{order?.orderId}</span>
                  </div>
                  <div className="text-sm text-gray-500">{formattedDate}</div>
                </div>
                
                <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium {getStatusColor(order.payment_status)}FCFA`}>
                    {order.payment_status || "Processing"}
                  </span>
                  <span className="text-sm font-medium">
                    Total: {order.totalAmt?.toFixed(2)}FCFA
                  </span>
                </div>
              </div>

              {/* Order content */}
              <div className="p-4">
                <div className='flex items-center gap-4'>
                  <div className="flex-shrink-0">
                    <img
                      src={order.product_details.image[0]} 
                      alt={order.product_details.name}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className='font-medium text-lg'>{order.product_details.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        onClick={() => toggleOrderDetails(order._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h4>
                        <div className="text-sm space-y-1">
                          <p>Method: <span className="font-medium">{order.payment_status || "Not specified"}</span></p>
                          {order.paymentId && <p>Payment ID: <span className="font-medium">{order.paymentId}</span></p>}
                          <p>Subtotal: <span className="font-medium">{order.subTotalAmt?.toFixed(2)}FCFA</span></p>
                          <p>Total: <span className="font-medium">{order.totalAmt?.toFixed(2)}FCFA</span></p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Delivery Information</h4>
                        <div className="text-sm">
                          {order.delivery_address ? (
                            <div className="space-y-1">
                              <p>{order.delivery_address.addressLine1}</p>
                              {order.delivery_address.addressLine2 && <p>{order.delivery_address.addressLine2}</p>}
                              <p>{order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipCode}</p>
                              <p>{order.delivery_address.country}</p>
                            </div>
                          ) : (
                            <p>No address information available</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-3">
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                        Edit Order
                      </button>
                      <button 
                        onClick={() => handleDeleteOrder(order._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders