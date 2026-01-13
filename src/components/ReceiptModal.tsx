import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Download, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  Clock, 
  XCircle,
  Shield,
  Calendar,
  Hash,
  Wallet,
  CreditCard,
  User,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface WithdrawalRecord {
  id: string;
  holderName: string;
  holderId: string;
  walletAddress: string;
  amount: string;
  inrValue: string;
  transactionHash: string;
  date: string;
  time: string;
  paymentMethod: string;
  status: 'Processed' | 'Pending' | 'Failed';
  notes: string;
  screenshot?: string;
  createdBy: string;
  createdAt: string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: WithdrawalRecord | null;
}

export default function ReceiptModal({ isOpen, onClose, record }: ReceiptModalProps) {
  if (!record) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processed': return CheckCircle;
      case 'Pending': return Clock;
      case 'Failed': return XCircle;
      default: return Clock;
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const openBlockchainExplorer = () => {
    // Mock blockchain explorer link
    const explorerUrl = `https://rbqscan.io/tx/${record.transactionHash}`;
    window.open(explorerUrl, '_blank');
  };

  const downloadReceipt = () => {
    // Mock PDF download functionality
    toast.success('Receipt download started');
    // In a real implementation, this would generate and download a PDF
  };

  const formatDate = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const StatusIcon = getStatusIcon(record.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b border-border pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-md transform rotate-45"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">RubyCon</h2>
                <p className="text-sm text-muted-foreground">Official Withdrawal Receipt</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(record.status)} px-4 py-2`}>
              <StatusIcon className="w-4 h-4 mr-2" />
              {record.status}
            </Badge>
          </div>

          {/* Receipt Details */}
          <div className="space-y-6">
            {/* Transaction Info */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Transaction Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Withdrawal ID</label>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-sm font-medium">{record.id}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(record.id, 'Withdrawal ID')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Date & Time</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{formatDate(record.date, record.time)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Holder Information */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Holder Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <p className="font-medium">{record.holderName}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Holder ID</label>
                  <p className="font-mono font-medium">{record.holderId}</p>
                </div>
              </div>
            </div>

            {/* Amount Information */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
              <h3 className="font-semibold mb-3 text-primary">Amount Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">RBQ Amount:</span>
                  <span className="text-xl font-bold text-primary">{record.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">INR Equivalent:</span>
                  <span className="text-xl font-bold">{record.inrValue}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Exchange Rate:</span>
                  <span>1 RBQ = ₹45.00</span>
                </div>
              </div>
            </div>

            {/* Wallet & Transaction Info */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                Blockchain Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Destination Wallet</label>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-sm">
                      {record.walletAddress.slice(0, 8)}...{record.walletAddress.slice(-8)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(record.walletAddress, 'Wallet Address')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {record.transactionHash && (
                  <div>
                    <label className="text-sm text-muted-foreground">Transaction Hash</label>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">
                        {record.transactionHash.slice(0, 12)}...{record.transactionHash.slice(-12)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(record.transactionHash, 'Transaction Hash')}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={openBlockchainExplorer}
                        className="h-6 w-6 p-0"
                        title="View on Blockchain Explorer"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Information
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{record.paymentMethod}</Badge>
                <span className="text-sm text-muted-foreground">• Processed securely</span>
              </div>
            </div>

            {/* Notes */}
            {record.notes && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Additional Notes</h3>
                <p className="text-sm text-muted-foreground">{record.notes}</p>
              </div>
            )}

            {/* Screenshot */}
            {record.screenshot && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Processing Proof</h3>
                <div className="bg-white rounded border p-2">
                  <img 
                    src={record.screenshot} 
                    alt="Withdrawal proof" 
                    className="max-w-full h-auto rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Footer */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>This withdrawal was processed securely by RubyCon</span>
            </div>
            
            <div className="text-center text-xs text-muted-foreground">
              <p>Generated on: {new Date().toLocaleString('en-IN')}</p>
              <p>For support, contact: support@rubyconworld.in</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-3 pt-4">
              <Button
                onClick={downloadReceipt}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}