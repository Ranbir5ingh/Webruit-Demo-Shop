import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { MoreHorizontal, Trash2, Eye, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  getAllPayments,
  updatePaymentStatus,
  deletePayment,
  getPaymentByTransactionId,
} from "@/store/admin/payment-slice";

function AdminPaymentsView() {
  const dispatch = useDispatch();
  const { paymentList, isLoading } = useSelector((state) => state.adminPayment);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    payment: null,
    newStatus: null,
  });

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  const handleUpdateStatus = (transactionId, status) => {
    dispatch(updatePaymentStatus({ transactionId, status }))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Payment status updated successfully");
        if (status === "completed") {
          toast.info("Resume kit has been sent to the customer's email!");
        }
      })
      .catch((error) => {
        toast.error(error || "Failed to update payment status");
      });
  };

  const handleDeletePayment = (paymentId) => {
    dispatch(deletePayment(paymentId))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Payment deleted successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to delete payment");
      });
  };



  const openConfirmDialog = (type, payment, newStatus = null) => {
    setConfirmDialog({
      open: true,
      type,
      payment,
      newStatus,
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      type: null,
      payment: null,
      newStatus: null,
    });
  };

  const handleConfirmAction = () => {
    const { type, payment, newStatus } = confirmDialog;
    
    if (type === "status") {
      handleUpdateStatus(payment.transactionId, newStatus);
    } else if (type === "delete") {
      handleDeletePayment(payment._id);
    }
    
    closeConfirmDialog();
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 hover:bg-green-600";
      case "failed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-yellow-500 hover:bg-yellow-600";
    }
  };

  const getConfirmationMessage = () => {
    const { type, payment, newStatus } = confirmDialog;
    
    if (type === "status") {
      if (newStatus === "completed") {
        return "Are you sure you want to mark this payment as completed? This will automatically send the Resume Kit Pro to the customer's email address.";
      } else if (newStatus === "failed") {
        return "Are you sure you want to mark this payment as failed? This action cannot be undone.";
      } else {
        return `Are you sure you want to mark this payment as ${newStatus}?`;
      }
    } else if (type === "delete") {
      return "Are you sure you want to delete this payment record? This action cannot be undone.";
    }
    return "";
  };

  const getConfirmationTitle = () => {
    const { type, newStatus } = confirmDialog;
    
    if (type === "status") {
      return `Confirm Status Update to ${newStatus?.charAt(0).toUpperCase() + newStatus?.slice(1)}`;
    } else if (type === "delete") {
      return "Confirm Delete Payment";
    }
    return "";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    if (status === "completed") {
      return <Mail className="h-3 w-3 mr-1" />;
    }
    return null;
  };

  return (
    <>
      <Card className="w-[90vw] sm:w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Resume Kit Pro - All Payments</span>
            <Badge variant="outline" className="font-normal">
              Total: {paymentList?.length || 0}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentList?.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell className="font-mono text-sm">
                      {payment.transactionId}
                    </TableCell>
                    <TableCell>{payment.email}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{payment.amount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${getStatusBadgeColor(payment.status)} flex items-center w-fit`}
                      >
                        {getStatusIcon(payment.status)}
                        {payment.status || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(payment.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
               
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isLoading}
                            >
                              <MoreHorizontal className="h-4 w-4 mr-1" />
                              Status
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openConfirmDialog("status", payment, "pending")}
                              disabled={payment.status === "pending"}
                            >
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openConfirmDialog("status", payment, "completed")}
                              disabled={payment.status === "completed"}
                              className="text-green-600"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Mark as Completed & Send Kit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openConfirmDialog("status", payment, "failed")}
                              disabled={payment.status === "failed"}
                              className="text-red-600"
                            >
                              Mark as Failed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openConfirmDialog("delete", payment)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {paymentList?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={closeConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getConfirmationTitle()}</AlertDialogTitle>
            <AlertDialogDescription>
              {getConfirmationMessage()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeConfirmDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmAction}
              disabled={isLoading}
              className={
                confirmDialog.type === "delete" || confirmDialog.newStatus === "failed"
                  ? "bg-red-600 hover:bg-red-700"
                  : confirmDialog.newStatus === "completed"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {isLoading ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AdminPaymentsView;