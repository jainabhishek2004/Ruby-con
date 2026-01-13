import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Search, MessageCircle, HelpCircle, File, Send, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    file: null
  });

  const tickets = [
    { id: 'TKT-001', subject: 'Withdrawal Pending', status: 'In Progress', priority: 'High', date: '2024-08-10', category: 'Wallet' },
    { id: 'TKT-002', subject: 'Payout Inquiry', status: 'Resolved', priority: 'Medium', date: '2024-08-05', category: 'Payout' },
    { id: 'TKT-003', subject: '2FA Setup Help', status: 'Resolved', priority: 'Low', date: '2024-07-28', category: 'Security' }
  ];

  const faqs = [
    {
      question: "How do I withdraw my RBQ tokens?",
      answer: "To withdraw RBQ tokens, go to your Dashboard > Wallet tab > Withdraw RBQ. Enter the amount and destination address, then confirm the transaction. Withdrawals are processed within 24 hours."
    },
    {
      question: "When are payouts distributed?",
      answer: "Payouts are distributed weekly on Mondays. The exact amount depends on your token holdings and the current payout rate. You can track upcoming payouts in your dashboard."
    },
    {
      question: "How do I enable 2FA on my account?",
      answer: "Go to Dashboard > Profile > Account Settings > Enable 2FA. Download an authenticator app like Google Authenticator, scan the QR code, and enter the verification code to activate 2FA."
    },
    {
      question: "What happens if I lose access to my account?",
      answer: "Contact support immediately with your Holder ID and registered email. Our team will verify your identity through KYC documents and help you regain access to your account."
    },
    {
      question: "How are bonus payouts calculated?",
      answer: "Bonus payouts are calculated based on your holding duration, token amount, and current phase bonuses. Longer holding periods and larger holdings receive higher bonus percentages."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use bank-grade encryption and follow strict data protection protocols. Your KYC information is stored securely and never shared with third parties."
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketForm);
    // Reset form
    setTicketForm({
      subject: '',
      category: '',
      priority: '',
      description: '',
      file: null
    });
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Support Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get help with your RubyCon account, transactions, and general inquiries. 
            Our support team is here to assist you 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Support Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Knowledge Base Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Search Knowledge Base</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for help articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            {/* Create Ticket */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Create Support Ticket</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your issue"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wallet">Wallet</SelectItem>
                            <SelectItem value="payout">Payout</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about your issue..."
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="file">Attachment (Optional)</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={(e) => setTicketForm({...ticketForm, file: e.target.files?.[0] || null})}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Support Email</Label>
                    <p className="text-sm text-primary">support@rubyconworld.in</p>
                  </div>
                  <div>
                    <Label>Response Time</Label>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                  <div>
                    <Label>Telegram Support</Label>
                    <p className="text-sm text-primary">@RubyConSupport</p>
                  </div>
                  <div>
                    <Label>Business Hours</Label>
                    <p className="text-sm text-muted-foreground">24/7 Support Available</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* My Tickets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>My Recent Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm">{ticket.id}</span>
                        <Badge 
                          variant={ticket.status === 'Resolved' ? 'default' : 'secondary'}
                          className={ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {ticket.status === 'Resolved' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{ticket.date}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}