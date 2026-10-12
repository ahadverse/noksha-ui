'use client';

import {
  Button,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const DEPARTMENTS = [
  { value: 'eng', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
];

const NOTICE = [
  { value: 'immediate', label: 'Immediately' },
  { value: '2w', label: 'Two weeks' },
  { value: '1m', label: 'One month' },
];

function renderDepartments() {
  return DEPARTMENTS.map((entry) => (
    <SelectItem key={entry.value} value={entry.value}>
      {entry.label}
    </SelectItem>
  ));
}

function SubmitsWithForm() {
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(String(data.get('routed') ?? ''));
      }}
    >
      <SelectRoot name="routed" defaultValue="ops">
        <SelectTrigger aria-label="Route to department" placeholder="Department" />
        <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
      </SelectRoot>
      <Button type="submit" size="sm" variant="soft">
        Submit
      </Button>
      {submitted ? (
        <code className="text-(--noksha-fg-subtle) text-xs">posted: {submitted}</code>
      ) : null}
    </form>
  );
}

export default function SelectForms() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Named for form posts">
        <SelectRoot name="department" defaultValue="eng">
          <SelectTrigger aria-label="Department" placeholder="Department" />
          <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
        </SelectRoot>
      </DemoTile>

      <DemoTile label="Label and control">
        <FieldRoot>
          <FieldLabel>Department</FieldLabel>
          <SelectRoot name="dept2" defaultValue="design">
            <SelectTrigger placeholder="Department" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Label and description">
        <FieldRoot>
          <FieldLabel>Department</FieldLabel>
          <SelectRoot name="dept3" defaultValue="sales">
            <SelectTrigger placeholder="Department" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
          <FieldDescription>Routing for new tickets.</FieldDescription>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Required marker">
        <FieldRoot required>
          <FieldLabel>Department</FieldLabel>
          <SelectRoot name="dept4" required>
            <SelectTrigger placeholder="Choose one" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Error state">
        <FieldRoot invalid>
          <FieldLabel>Department</FieldLabel>
          <SelectRoot name="dept5" invalid>
            <SelectTrigger placeholder="Choose one" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
          <FieldError>This field is required.</FieldError>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Disabled field">
        <FieldRoot disabled>
          <FieldLabel>Department</FieldLabel>
          <SelectRoot name="dept6" disabled defaultValue="ops">
            <SelectTrigger placeholder="Department" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
          <FieldDescription>Locked by your administrator.</FieldDescription>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Small field">
        <FieldRoot size="sm">
          <FieldLabel>Notice period</FieldLabel>
          <SelectRoot name="notice1" defaultValue="2w">
            <SelectTrigger size="sm" placeholder="Notice" />
            <SelectContent matchTriggerWidth>
              {NOTICE.map((entry) => (
                <SelectItem key={entry.value} value={entry.value}>
                  {entry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Large field">
        <FieldRoot size="lg">
          <FieldLabel>Notice period</FieldLabel>
          <SelectRoot name="notice2" defaultValue="1m">
            <SelectTrigger size="lg" placeholder="Notice" />
            <SelectContent matchTriggerWidth>
              {NOTICE.map((entry) => (
                <SelectItem key={entry.value} value={entry.value}>
                  {entry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Horizontal field">
        <FieldRoot orientation="horizontal">
          <FieldLabel>Team</FieldLabel>
          <SelectRoot name="dept7" defaultValue="eng">
            <SelectTrigger size="sm" placeholder="Team" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Hidden required marker">
        <FieldRoot required>
          <FieldLabel hideRequiredMarker>Department</FieldLabel>
          <SelectRoot name="dept8" required defaultValue="design">
            <SelectTrigger placeholder="Department" />
            <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
          </SelectRoot>
        </FieldRoot>
      </DemoTile>

      <DemoTile label="Submits with form">
        <SubmitsWithForm />
      </DemoTile>

      <DemoTile label="Two fields stacked">
        <div className="flex flex-col gap-3">
          <FieldRoot>
            <FieldLabel>Department</FieldLabel>
            <SelectRoot name="dept9" defaultValue="sales">
              <SelectTrigger size="sm" placeholder="Department" />
              <SelectContent matchTriggerWidth>{renderDepartments()}</SelectContent>
            </SelectRoot>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Notice</FieldLabel>
            <SelectRoot name="notice3" defaultValue="immediate">
              <SelectTrigger size="sm" placeholder="Notice" />
              <SelectContent matchTriggerWidth>
                {NOTICE.map((entry) => (
                  <SelectItem key={entry.value} value={entry.value}>
                    {entry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </FieldRoot>
        </div>
      </DemoTile>
    </div>
  );
}
