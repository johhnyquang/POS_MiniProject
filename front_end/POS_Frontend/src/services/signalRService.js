import * as signalR from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection(apiUrl) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/newOrder`)
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log('SignalR Connected');
      return true;
    } catch (err) {
      console.error('SignalR Connection Error:', err);
      return false;
    }
  }

  onReceiveNewOrder(callback) {
    if (this.connection) {
      this.connection.on('NotifyNewOrder', callback);
    }
  }

  async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      console.log('SignalR Disconnected');
    }
  }

  isConnected() {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

export default new SignalRService();