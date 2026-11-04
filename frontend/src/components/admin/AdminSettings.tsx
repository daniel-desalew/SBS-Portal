'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPut, ApiClientError } from '../../lib/api';
import { getErrorMessage } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader } from '../shared/Loader';

interface ApplicationWindow {
  enabled: boolean;
  opensAt: string;
  closesAt: string;
}

export function AdminSettings() {
  const [settings, setSettings] = useState<ApplicationWindow | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    void apiGet<{ key: string; value: ApplicationWindow }>('/settings/application-window')
      .then((response) => { if (active) setSettings(response.data.value); })
      .catch((requestError: unknown) => {
        if (!active) return;
        if (requestError instanceof ApiClientError && requestError.status === 404) {
          setSettings({
            enabled: false,
            opensAt: new Date().toISOString(),
            closesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });
          return;
        }
        setError(getErrorMessage(requestError));
      });
    return () => { active = false; };
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await apiPut('/settings/applicationWindow', { value: settings });
      setSaved(true);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  }

  if (!settings && !error) return <Loader />;
  return (
    <section className="admin-section">
      <div><p className="eyebrow">PORTAL CONFIGURATION</p><h1>Settings</h1></div>
      {settings ? (
        <div className="panel form-stack">
          <h2>Application window</h2>
          <label className="inline-label"><input type="checkbox" checked={settings.enabled} onChange={(event) => setSettings({ ...settings, enabled: event.target.checked })} /> Accept applications</label>
          <label>Opens at<Input type="datetime-local" required value={settings.opensAt.slice(0, 16)} onChange={(event) => {
            const timestamp = Date.parse(event.target.value);
            if (Number.isFinite(timestamp)) setSettings({ ...settings, opensAt: new Date(timestamp).toISOString() });
          }} /></label>
          <label>Closes at<Input type="datetime-local" required value={settings.closesAt.slice(0, 16)} onChange={(event) => {
            const timestamp = Date.parse(event.target.value);
            if (Number.isFinite(timestamp)) setSettings({ ...settings, closesAt: new Date(timestamp).toISOString() });
          }} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          {saved && <p className="form-success" role="status">Settings saved.</p>}
          <Button disabled={saving} onClick={() => void save()}>{saving ? 'Saving…' : 'Save settings'}</Button>
        </div>
      ) : <p className="form-error" role="alert">{error}</p>}
    </section>
  );
}
