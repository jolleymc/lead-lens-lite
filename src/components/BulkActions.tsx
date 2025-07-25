import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Edit, CheckSquare, Square } from "lucide-react";
import { Lead } from "@/types/lead";
import { useState } from "react";

interface BulkActionsProps {
  selectedLeads: Set<string>;
  totalLeads: number;
  onToggleSelectAll: () => void;
  onBulkDelete: () => void;
  onBulkUpdateStatus: (status: Lead['pitchStatus']) => void;
}

export const BulkActions = ({
  selectedLeads,
  totalLeads,
  onToggleSelectAll,
  onBulkDelete,
  onBulkUpdateStatus,
}: BulkActionsProps) => {
  const [selectedStatus, setSelectedStatus] = useState<Lead['pitchStatus']>('New');
  const selectedCount = selectedLeads.size;

  if (selectedCount === 0) {
    return (
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSelectAll}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Select All ({totalLeads})
            </Button>
            <p className="text-sm text-muted-foreground">
              Select leads to perform bulk actions
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSelectAll}
              className="flex items-center gap-2"
            >
              <CheckSquare className="h-4 w-4" />
              {selectedCount === totalLeads ? 'Deselect All' : 'Select All'}
            </Button>
            <Badge variant="secondary">
              {selectedCount} selected
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Bulk Status Update */}
            <div className="flex items-center gap-2">
              <Select value={selectedStatus} onValueChange={(value: Lead['pitchStatus']) => setSelectedStatus(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkUpdateStatus(selectedStatus)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Update Status
              </Button>
            </div>

            {/* Bulk Delete */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Selected Leads</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {selectedCount} lead{selectedCount !== 1 ? 's' : ''}? 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete {selectedCount} Lead{selectedCount !== 1 ? 's' : ''}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};