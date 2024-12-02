const Imovel = require('../models/imovelModels');

const cadastrarImovel = async (req, res) => {
    try {
        // Recebendo os dados do frontend (data de nascimento é a data de construção)
        const { endereco, descricao, num_comodos, data_nascimento } = req.body;
        
        // Pegando o ID do usuário logado
        const id_cliente = req.user.id; 

        // Verificar se a data de nascimento (data da construção) foi passada corretamente
        if (!data_nascimento) {
            return res.status(400).json({ message: 'Data de nascimento (data de construção) é obrigatória!' });
        }

        // Garantindo que num_comodos seja um número inteiro e maior que 0
        if (isNaN(num_comodos) || num_comodos <= 0) {
            return res.status(400).json({ message: 'Número de cômodos inválido!' });
        }

        // Criando o novo imóvel no banco de dados
        await Imovel.create({ 
            endereco, 
            descricao, 
            num_comodos, 
            data_nascimento,  // Adicionando a data de nascimento (data de construção)
            id_cliente 
        });

        // Enviando resposta de sucesso
        res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
        res.status(500).json({ message: 'Erro ao cadastrar imóvel' });
    }
};


const editarImovel = async (req, res) => {
    try {
        const { id } = req.params;
        const { endereco, descricao, num_comodos } = req.body;
        const id_cliente = req.user.id;

        const [updated] = await Imovel.update(
            { endereco, descricao, num_comodos },
            { where: { id, id_cliente } }
        );

        if (updated) {
            return res.status(200).json({ message: 'Imóvel atualizado com sucesso!' });
        }

        res.status(403).json({ message: 'Você não tem permissão para editar este imóvel.' });
    } catch (error) {
        console.error('Erro ao editar imóvel:', error);
        res.status(500).json({ message: 'Erro ao editar imóvel' });
    }
};

const excluirImovel = async (req, res) => {
    try {
        const { id } = req.params;
        const id_cliente = req.user.id;

        const deleted = await Imovel.destroy({ where: { id, id_cliente } });

        if (deleted) {
            return res.status(200).json({ message: 'Imóvel excluído com sucesso!' });
        }

        res.status(403).json({ message: 'Você não tem permissão para excluir este imóvel.' });
    } catch (error) {
        console.error('Erro ao excluir imóvel:', error);
        res.status(500).json({ message: 'Erro ao excluir imóvel' });
    }
};

module.exports = { cadastrarImovel, editarImovel, excluirImovel };
