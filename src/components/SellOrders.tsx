import React, { useState } from 'react';
import { useRubyCon } from './RubyConContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { TrendingUp, Plus, X, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function SellOrders() {
  const { 
    getCurrentUser, 
    getUserSellOrders, 
    createSellOrder, 
    cancelSellOrder,
    formatRBQValue,
    rbqRate
  } = useRubyCon();
  
  const currentUser = getCurrentUser();
  const userSellOrders = getUserSellOrders(currentUser.id);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tokens = parseFloat(tokenAmount);
    const minPrice = parseFloat(minimumPrice);
    
    if (isNaN(tokens) || tokens <= 0) {
      toast.error('Please enter a valid token amount', { duration: 3000 });
      return;
    }
    
    if (isNaN(minPrice) || minPrice <= 0) {
      toast.error('Please enter a valid minimum price', { duration: 3000 });
      return;
    }

    if (tokens > currentUser.rbqBalance) {
      toast.error(`Insufficient balance. You have ${formatRBQValue(currentUser.rbqBalance)} RBQ`, { duration: 3000 });
      return;
    }

    createSellOrder(tokens, minPrice);
    setTokenAmount('');
    setMinimumPrice('');
    setShowCreateForm(false);
  };

  const handleCancel = (orderId: string) => {
    cancelSellOrder(orderId);
  };

  const activeOrders = userSellOrders.filter(order => order.status === 'active');
  const completedOrders = userSellOrders.filter(order => order.status === 'fulfilled');
  const cancelledOrders = userSellOrders.filter(order => order.status === 'cancelled');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'fulfilled':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fulfilled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sell Orders</h2>
          <p className="text-gray-600 mt-1">Create sell orders and await bids from authorized traders</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-[#AA0114] hover:bg-[#880010] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showCreateForm ? 'Cancel' : 'Create Sell Order'}
        </Button>
      </div>

      {/* Available Balance Card */}
      <Card className="border-[#AA0114]/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatRBQValue(currentUser.rbqBalance)} RBQ
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ≈ ₹{(currentUser.rbqBalance * rbqRate).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-[#AA0114]/10 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-[#AA0114]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Sell Order Form */}
      {showCreateForm && (
        <Card className="border-[#AA0114]/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#AA0114]">Create New Sell Order</CardTitle>
            <CardDescription>
              Specify the amount of RBQ tokens you want to sell and your minimum asking price per token
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenAmount">Token Amount (RBQ)</Label>
                  <Input
                    id="tokenAmount"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 1000"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(e.target.value)}
                    className="border-gray-300 focus:border-[#AA0114] focus:ring-[#AA0114]"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Max: {formatRBQValue(currentUser.rbqBalance)} RBQ
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumPrice">Minimum Price per Token (INR)</Label>
                  <Input
                    id="minimumPrice"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 35.00"
                    value={minimumPrice}
                    onChange={(e) => setMinimumPrice(e.target.value)}
                    className="border-gray-300 focus:border-[#AA0114] focus:ring-[#AA0114]"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Current market rate: ₹{rbqRate.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Summary */}
              {tokenAmount && minimumPrice && !isNaN(parseFloat(tokenAmount)) && !isNaN(parseFloat(minimumPrice)) && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Order Summary</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tokens for Sale:</span>
                      <span className="font-semibold">{parseFloat(tokenAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} RBQ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price per Token:</span>
                      <span className="font-semibold">₹{parseFloat(minimumPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-300">
                      <span className="text-gray-900 font-semibold">Minimum Total Value:</span>
                      <span className="font-bold text-[#AA0114]">
                        ₹{(parseFloat(tokenAmount) * parseFloat(minimumPrice)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit"
                  className="flex-1 bg-[#AA0114] hover:bg-[#880010] text-white"
                >
                  Create Sell Order
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setTokenAmount('');
                    setMinimumPrice('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Orders */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Active Sell Orders ({activeOrders.length})</h3>
        {activeOrders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No active sell orders</p>
              <p className="text-sm text-gray-500 mt-1">Create your first sell order to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOrders.map((order) => (
              <Card key={order.id} className="border-[#AA0114]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                      <CardDescription>Created on {order.createdDate}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Token Amount:</span>
                      <span className="font-semibold">{formatRBQValue(order.tokenAmount)} RBQ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price per Token:</span>
                      <span className="font-semibold">₹{order.pricePerToken.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="text-gray-900 font-semibold">Minimum Total:</span>
                      <span className="font-bold text-[#AA0114]">
                        ₹{order.minimumPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleCancel(order.id)}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed & Cancelled Orders */}
      {(completedOrders.length > 0 || cancelledOrders.length > 0) && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Order History</h3>
          <div className="grid grid-cols-1 gap-4">
            {[...completedOrders, ...cancelledOrders].map((order) => (
              <Card key={order.id} className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-base">Order #{order.id.slice(-6)}</CardTitle>
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>
                        Created: {order.createdDate} | Updated: {order.updatedDate}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatRBQValue(order.tokenAmount)} RBQ</p>
                      <p className="text-xs text-gray-500">@ ₹{order.pricePerToken.toFixed(2)}/token</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
