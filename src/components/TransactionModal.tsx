import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Copy, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  Wallet,
  Calendar,
  Timer,
  User,
  Hash,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  X
} from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: string;
  value: string;
  date: string;
  time: string;
  status: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': 
      case 'processed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': 
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'processed': return CheckCircle;
      case 'pending': return Clock;
      case 'processing': return Timer;
      case 'failed':
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getTransactionIcon = (type: string) => {
    const isDeposit = type.toLowerCase().includes('deposit') || type.toLowerCase().includes('bonus') || type.toLowerCase().includes('payout');
    return isDeposit ? ArrowDownLeft : ArrowUpRight;
  };

  const getTransactionColor = (type: string) => {
    const isDeposit = type.toLowerCase().includes('deposit') || type.toLowerCase().includes('bonus') || type.toLowerCase().includes('payout');
    return isDeposit ? 'text-green-600' : 'text-red-600';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateTransactionHash = (id: string) => {
    // Generate a mock transaction hash based on transaction ID
    const hash = `0x${id.toLowerCase().replace('txn-', '')}a1b2c3d4e5f6789012345678901234567890abcdef123456789012345678901234`;
    return hash.substring(0, 66); // Standard length for transaction hash
  };

  const StatusIcon = getStatusIcon(transaction.status);
  const TransactionIcon = getTransactionIcon(transaction.type);
  const transactionHash = generateTransactionHash(transaction.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <div className={`p-3 rounded-full bg-card border ${getTransactionColor(transaction.type)}`}>
                <TransactionIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Transaction Details</h3>
                <p className="text-sm text-muted-foreground">Transaction ID: {transaction.id}</p>
              </div>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUp className="w-5 h-5" />
                <span>Transaction Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold">{transaction.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(transaction.status)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {transaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">INR Value</p>
                  <p className="font-semibold text-lg">{transaction.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calendar className="w-5 h-5" />
                <span>Date & Time Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Date</p>
                  <p className="font-medium">{transaction.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Time</p>
                  <p className="font-medium">{transaction.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timestamp</p>
                <p className="font-mono text-sm bg-secondary p-2 rounded">
                  {new Date(`${transaction.date} ${transaction.time}`).toISOString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Hash className="w-5 h-5" />
                <span>Technical Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-secondary p-2 rounded font-mono text-sm break-all">
                    {transactionHash}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(transactionHash)}
                    title="Copy Hash"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-secondary p-2 rounded font-mono text-sm">
                    RBQ1x7F9mK3nP8vQ2wR5tY6uE8dH4jS9cL1aB0
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard('RBQ1x7F9mK3nP8vQ2wR5tY6uE8dH4jS9cL1aB0')}
                    title="Copy Address"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Network</p>
                  <p className="font-medium">RubyCon Blockchain</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmations</p>
                  <p className="font-medium text-green-600">24 / 24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <User className="w-5 h-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Account Holder</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Holder ID</p>
                  <p className="font-medium">RBC-15247</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current RBQ Rate</p>
                  <p className="font-medium">₹45.00</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processing Fee</p>
                  <p className="font-medium">₹0.00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => window.open(`https://rbqscan.io/tx/${transactionHash}`, '_blank')}
              className="flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Blockchain</span>
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  const details = `
Transaction Details:
ID: ${transaction.id}
Type: ${transaction.type}
Amount: ${transaction.amount}
Value: ${transaction.value}
Date: ${transaction.date} ${transaction.time}
Status: ${transaction.status}
Hash: ${transactionHash}
                  `.trim();
                  copyToClipboard(details);
                }}
              >
                Copy Details
              </Button>
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}