import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { toast } from "sonner";

export function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      toast.error("Notificações não suportadas neste navegador");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === "granted") {
        toast.success("Notificações ativadas!");
        
        // Enviar notificação de teste
        setTimeout(() => {
          sendTestNotification();
        }, 1000);
      } else {
        toast.error("Permissão negada para notificações");
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error);
      toast.error("Erro ao ativar notificações");
    }
  };

  const sendTestNotification = () => {
    if ('serviceWorker' in navigator && permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Bem-vindo ao Meus App! 🚛', {
          body: 'Você receberá alertas de novos fretes e atualizações importantes.',
          icon: '/logo_meus_app_proposta_1.png',
          badge: '/logo_meus_app_proposta_1.png',
          data: { url: '/fretes' },
          actions: [
            { action: 'open', title: 'Ver Fretes' },
            { action: 'close', title: 'Fechar' }
          ]
        } as any);
      });
    }
  };

  if (!isSupported) return null;

  return (
    <div className="flex items-center gap-2">
      {permission === "granted" ? (
        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <Bell className="w-3 h-3" />
          <span>Notificações ativas</span>
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={requestPermission}
          className="text-xs"
        >
          <BellOff className="w-3 h-3 mr-2" />
          Ativar Notificações
        </Button>
      )}
    </div>
  );
}
