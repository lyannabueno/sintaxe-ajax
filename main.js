$(document).ready(function() {
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val().replace('-', ''); // Remove caracteres da máscara antes de enviar
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);

        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        fetch(endpoint)
        
        .then(function(resposta) {
            return resposta.json()
        })

            .then(function(json) {
                console.log(json)
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                $('#endereco').val(endereco);
            })

            .catch(function(erro) {
                alert("Ocorreu um erro ao buscar o endereço, tente novamente mais tarde!")
            })

            .finally(function() {
                resetButton();
            })

            function resetButton() {
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            }
    });

    $('#form-pedido').submit(function(event) {
        event.preventDefault();

        let hasError = false;
        
        if ($("#nome").val().length == 0) {
            $("#nome").css('border', '1px solid red')
            $("#nome").next('.error-message').text("campo obrigatório")
            hasError = true;
        } else {
            $("#nome").css('border', '')
            $("#nome").next('.error-message').text("")
        }
        
        if ($("#sobrenome").val().length == 0) {
            $("#sobrenome").css('border', '1px solid red')
            $("#sobrenome").next('.error-message').text("campo obrigatório")
            hasError = true;
        } else {
            $("#sobrenome").css('border', '')
            $("#sobrenome").next('.error-message').text("")
        }    
        
        if ($("#email").val().length == 0) {
            $("#email").css('border', '1px solid red')
            $("#email").next('.error-message').text("campo obrigatório")
            hasError = true;
        } else {
            $("#email").css('border', '')
            $("#email").next('.error-message').text("")
        }

        if (!hasError) {
            this.submit();
        }
    })

    $("#nome, #sobrenome, #email").on('input', function() {
        if ($(this).val().length > 0) {
            $(this).css('border', '');
            $(this).next('.error-message').text("");
        }
    });
});
