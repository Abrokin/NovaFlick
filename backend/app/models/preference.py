from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class UserGenrePreference(Base):
    __tablename__ = "user_genre_preferences"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    genre_id: Mapped[int] = mapped_column(
        nullable=False
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "genre_id",
            name="uq_user_genre_preference"
        ),
    )