// Função para formatar data
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Verificar se a data é válida
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }
  
  // Obter a diferença em milissegundos
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  // Formatar a data com base na diferença
  if (diffSecs < 60) {
    return 'agora mesmo';
  } else if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'} atrás`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
  } else {
    // Formatar como data completa para datas mais antigas
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};