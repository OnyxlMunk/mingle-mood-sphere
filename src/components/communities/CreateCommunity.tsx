import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import { useCommunities } from '@/hooks/useCommunities';

export function CreateCommunity() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createCommunity } = useCommunities();

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);
    await createCommunity(name, description, isPrivate);
    
    // Reset form and close dialog
    setName('');
    setDescription('');
    setIsPrivate(false);
    setOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Community</DialogTitle>
          <DialogDescription>
            Start a new community to connect with like-minded people
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              placeholder="Enter community name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what your community is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="private"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
            <Label htmlFor="private" className="text-sm">
              Make this a private community
            </Label>
          </div>
          {isPrivate && (
            <p className="text-xs text-muted-foreground">
              Private communities require approval to join and are not visible to non-members.
            </p>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Community'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}