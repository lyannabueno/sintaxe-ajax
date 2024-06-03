$(document).ready(function() {
    // Garantir que a biblioteca de máscara seja carregada corretamente e aplicada
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val().replace('-', ''); // Remove caracteres da máscara antes de enviar
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const botao = $(this);

        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        $.ajax({
            url: endpoint,
            type: 'GET',
            success: function(resposta) {
                if (resposta.erro) {
                    alert("CEP não encontrado");
                    resetButton();
                    return;
                }

                const logradouro = resposta.logradouro;
                const bairro = resposta.bairro;
                const cidade = resposta.localidade;
                const estado = resposta.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;

                $('#endereco').val(endereco);
                resetButton();
            },
            error: function() {
                alert("Erro ao buscar CEP");
                resetButton();
            }
        });

        function resetButton() {
            $(botao).find('i').removeClass('d-none');
            $(botao).find('span').addClass('d-none');
        }
    });
});
