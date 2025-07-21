import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useMoods } from '@/hooks/useMoods';

const moodTypes = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-mood-happy' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-mood-sad' },
  { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-mood-anxious' },
  { value: 'calm', label: 'Calm', emoji: '😌', color: 'bg-mood-calm' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡', color: 'bg-mood-energetic' },
  { value: 'tired', label: 'Tired', emoji: '😴', color: 'bg-mood-tired' },
];

export function MoodLogger() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [moodLevel, setMoodLevel] = useState([5]);
  const [notes, setNotes] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const { addMood } = useMoods();

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsLogging(true);
    await addMood(selectedMood, moodLevel[0], notes);
    
    // Reset form
    setSelectedMood('');
    setMoodLevel([5]);
    setNotes('');
    setIsLogging(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Your Mood</CardTitle>
        <CardDescription>How are you feeling right now?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Type Selection */}
        <div>
          <Label className="text-base font-medium">Select your mood</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {moodTypes.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary/10'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Intensity */}
        <div>
          <Label className="text-base font-medium">
            Intensity: {moodLevel[0]}/10
          </Label>
          <div className="mt-3">
            <Slider
              value={moodLevel}
              onValueChange={setMoodLevel}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="text-base font-medium">
            Notes (optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="What's on your mind? Any thoughts about your mood today..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isLogging}
          className="w-full"
        >
          {isLogging ? 'Logging...' : 'Log Mood'}
        </Button>
      </CardContent>
    </Card>
  );
}