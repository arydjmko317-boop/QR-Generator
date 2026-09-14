/**
 * QR Helper Utility
 * Provides functions to format specific data types into QR-compatible strings
 */

const formatQRValue = (type, data) => {
  try {
    switch (type) {
      case 'EMAIL':
        // Example: mailto:someone@example.com?subject=Hello&body=Message
        return `mailto:${data.email || ''}?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(data.body || '')}`;
      
      case 'WIFI':
        // Example: WIFI:T:WPA;S:network-name;P:password;;
        return `WIFI:T:${data.encryption || 'WPA'};S:${data.ssid || ''};P:${data.password || ''};;`;
      
      case 'VCARD':
        // Standard VCard 3.0 format
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${data.name || ''}`,
          `TEL;TYPE=CELL:${data.phone || ''}`,
          `EMAIL:${data.email || ''}`,
          `ORG:${data.company || ''}`,
          `TITLE:${data.job || ''}`,
          `ADR;TYPE=WORK:;;${data.address || ''}`,
          `URL:${data.website || ''}`,
          'END:VCARD'
        ].join('\n');

      case 'TEXT':
      case 'URL':
      default:
        return data.value || data;
    }
  } catch (error) {
    console.error('Error formatting QR value:', error);
    return typeof data === 'string' ? data : '';
  }
};

// Expose to window for global access since we are not using modules
window.qrHelper = {
  formatQRValue
};