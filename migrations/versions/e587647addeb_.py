"""empty message

Revision ID: e587647addeb
Revises: 644cf7be14c9
Create Date: 2021-04-16 01:59:15.594074

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e587647addeb'
down_revision = '644cf7be14c9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('time_zone', sa.String(length=120), nullable=True))
    op.create_unique_constraint(None, 'user', ['time_zone'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_column('user', 'time_zone')
    # ### end Alembic commands ###
