$(document).ready(function() {
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

    $('#form-pedido').submit(function(event) {

        let hasError = false;
        
        if ($("#nome").val().length == 0) {
            $("#nome").css('border', '1px solid red')
            $("#nome").next('.error-message').text("campo obrigatório").show()
            hasError = true;
        } else {
            $("#nome").css('border', '')
            $("#nome").next('.error-message').hide()
        }
        
        if ($("#sobrenome").val().length == 0) {
            $("#sobrenome").css('border', '1px solid red')
            $("#sobrenome").next('.error-message').text("campo obrigatório").show()
            hasError = true;
        } else {
            $("#sobrenome").css('border', '')
            $("#sobrenome").next('.error-message').hide()
        }    
        
        if ($("#email").val().length == 0) {
            $("#email").css('border', '1px solid red')
            $("#email").next('.error-message').text("campo obrigatório").show()
            hasError = true;
        } else {
            $("#email").css('border', '')
            $("#email").next('.error-message').hide()
        }

        if (!hasError) {
            this.submit();
        } else {
            event.preventDefault();
        }
    })

    $("#nome, #sobrenome, #email").on('input', function() {
        if ($(this).val().trim().length > 0) {
            $(this).css('border', '');
            $(this).next('.error-message').hide();
        }
    });
});
