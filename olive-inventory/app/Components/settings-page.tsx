'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { translations } from '@/lib/translations';

export default function SettingsPage() {
  const [lang, setLang] = useState('en');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);
  }, []);

  const t = translations[lang as keyof typeof translations];

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    setSaveMessage(t.settingsSaved);
    setTimeout(() => setSaveMessage(''), 3000);
    window.location.reload();
  };

  const handleResetData = () => {
    if (window.confirm(t.confirmReset)) {
      localStorage.removeItem('olives');
      localStorage.removeItem('tasks');
      localStorage.removeItem('language');
      localStorage.removeItem('darkMode');
      setSaveMessage(t.dataReset);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">{t.settings}</h1>

      {saveMessage && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <AlertDescription className="text-green-700 dark:text-green-300">{saveMessage}</AlertDescription>
        </Alert>
      )}

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t.language}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{t.selectLanguage}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Español' },
                { code: 'ru', name: 'Русский' },
              ].map((item) => (
                <Button
                  key={item.code}
                  onClick={() => handleLanguageChange(item.code)}
                  variant={lang === item.code ? 'default' : 'outline'}
                  className="w-full"
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>{t.generalPreferences}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{t.preferences}</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">✓ {t.darkLightTheme}</p>
              <p className="text-sm">✓ {t.multiLanguage}</p>
              <p className="text-sm">✓ {t.localStorage}</p>
              <p className="text-sm">✓ {t.responsive}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">{t.dataManagement}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-destructive/10 border-destructive/20">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">{t.resetWarning}</AlertDescription>
          </Alert>
          <Button onClick={handleResetData} variant="destructive" className="w-full">
            {t.resetAllData}
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>{t.appInfo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>{t.appName}:</strong> Olive Inventory Management</p>
            <p><strong>{t.version}:</strong> 1.0.0</p>
            <p><strong>{t.storage}:</strong> Local Storage</p>
            <p><strong>{t.theme}:</strong> {t.darkLight}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
